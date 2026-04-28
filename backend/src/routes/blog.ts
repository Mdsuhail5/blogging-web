import { Hono } from 'hono';
import { Prisma, PrismaClient } from '../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@iam_npm/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
        ACCELERATE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        prisma: PrismaClient;
        userId: string;
    }
}>()

blogRouter.use('*', async (c, next) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    c.set('prisma', prisma as unknown as PrismaClient);
    await next();
});


blogRouter.use('/*', async (c, next) => {

    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    const parts = jwt.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    try {
        const payload = await verify(parts[1], c.env.JWT_SECRET, 'HS256');
        c.set('userId', String(payload.id));
        await next();
    } catch {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
})

blogRouter.get('/', async (c) => {
    const body = await c.req.json();

    const prisma = c.get('prisma');
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: body.id
            }
        })
        return c.json({ blog })
    } catch (e) {
        c.status(411)
        return c.json({ message: "Error while fetching blog post" })
    }

});


blogRouter.post('/', async (c) => {
    const prisma = c.get('prisma');
    await prisma.$connect();
    const userId = c.get("userId");
    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Inputs not correct" });
    }

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    });

    return c.json({ id: blog.id });
});

blogRouter.put('/', async (c) => {
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Inputs not correct" });
    }

    const prisma = c.get('prisma');
    await prisma.$connect();
    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({ id: blog.id })
});

blogRouter.get("/bulk", async (c) => {
    const prisma = c.get('prisma');
    await prisma.$connect();
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    }
    );
    return c.json({ blogs });
})

blogRouter.get('/:id', async (c) => {
    const bid = c.req.param('id');
    const prisma = c.get('prisma');
    await prisma.$connect();
    console.log(bid);
    const blog = await prisma.blog.findFirst({
        where: {
            id: bid
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        },
    })
    return c.json({ blog });
});