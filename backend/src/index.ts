import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    ACCELERATE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    prisma: any
  }
}>();

app.use('*', cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);



export default app;