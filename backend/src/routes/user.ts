import { Hono } from 'hono';
import { PrismaClient } from '../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from '@iam_npm/medium-common';


export const userRouter = new Hono<{
    Bindings: {
        ACCELERATE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        prisma: any;
        userId: string;
    }

}>();


userRouter.use('*', async (c, next) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    c.set('prisma', prisma);
    await next();
});


userRouter.post('/signup', async (c) => {
    const prisma = c.get('prisma');
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid inputs" })
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
});

userRouter.post('/signin', async (c) => {
    const prisma = c.get('prisma');
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid inputs" })
    }
    const logged = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password,
        }
    });

    if (!logged) {
        c.status(403);
        return c.json({ error: "user not found" });
    }
    const jwt = await sign({ id: logged.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
});