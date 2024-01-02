import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getSuperAdmin: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      where: {
        role: 'SUPER_ADMIN'
      }
    })
  })
});

