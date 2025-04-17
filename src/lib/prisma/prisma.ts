import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../helpers/util";

const globalForPrisma = globalThis as unknown as { prisma: ReturnType<typeof prismaClientSingleton> };

const prismaClientSingleton = () => {
  const prismaClient = new PrismaClient({
    omit: {
      user: {
        password: true
      }
    }
  }).$extends({
    model: {
      user: {
        async signUp(email: string, password: string) {
          const hash = hashPassword(password);
          return prismaClient.user.create({ data: { email, password: hash } });
        },
      },
    },
  });

  return prismaClient;
};

export const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
