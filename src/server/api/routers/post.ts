import { z } from 'zod'
import { type Prisma } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { BasePageInfo, BaseFilterInfo, BaseOrderInfo } from '~/server/api/inputs'

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const superAdmin = await ctx.db.user.findFirst({
        where: {
          role: 'SUPER_ADMIN'
        },
      })

      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          userId: superAdmin!.id,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({
      id: z.number(),
    })).mutation(async ({ ctx, input }) => {
      const { id } = input

      return ctx.db.post.delete({
        where: { id }
      })
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      post: z.object({
        title: z.optional(z.string().min(1)),
      })
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, post } = input

      return ctx.db.post.update({
        where: { id },
        data: post,
      })
    }),

  find: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      return ctx.db.post.findUnique({
        where: { id },
        include: {
          user: true,
          categories: true,
          tags: true,
        }
      })
    }),

  pages: publicProcedure
    .input(
      BasePageInfo
        .merge(BaseFilterInfo)
        .merge(BaseOrderInfo)
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, keywords } = input

      const where: Prisma.PostWhereInput = {}

      if (keywords) {
        where.title = {
          contains: keywords,
        }
      }

      return ctx.db.post.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
          tags: true,
          categories: true,
        }
      })
    }),

  hello: publicProcedure
    .input(z.object({
      text: z.string()
    }))
    .query(({ input }) => {
      const { text } = input

      return {
        status: 'ok',
        greeting: text,
      }
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
