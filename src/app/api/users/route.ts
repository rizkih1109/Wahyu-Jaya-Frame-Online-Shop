import { prisma } from "@/app/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json(
        { message: "get users failed" },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const checkUser = await prisma.user.findUnique({ where: { email } });

    if (checkUser) return NextResponse.json({message: "email is already exist"}, {status: 400})

    const user = await prisma.user.signUp(email, password);
    
    const seller = await prisma.user.update({
      where: { id: user.id },
      data: {
        role: "seller",
      },
    });
    return NextResponse.json(seller);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json(
        { message: "post users failed" },
        { status: 500 }
      );
    }
  }
}
