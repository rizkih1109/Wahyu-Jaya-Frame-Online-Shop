import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../helpers/util";

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton>;
};

const prismaClientSingleton = () => {
  const prismaClient = new PrismaClient({
    omit: {
      user: {
        password: false,
      },
    },
  }).$extends({
    model: {
      user: {
        async signUp(email: string, password: string) {
          const hash = hashPassword(password);
          return prismaClient.user.create({ data: { email, password: hash } });
        },
        async addOperator(
          email: string,
          password: string,
          userName: string,
          phone: string,
          role: Role
        ) {
          const hash = hashPassword(password);
          return prismaClient.user.create({
            data: {
              email,
              password: hash,
              userName,
              phone,
              role,
            },
          });
        },
      },
    },
  });

  return prismaClient;
};

export const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
