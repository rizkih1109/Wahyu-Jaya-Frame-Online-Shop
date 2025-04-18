import { checkToken } from "@/lib/helpers/util";
import { prisma } from "@/lib/prisma/prisma";
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
    const { email, password, userName, phone, role } = await req.json();

    const token = req.headers.get("Authorization")?.slice(7);
    if (!token) throw Error("Token is not valid");

    const userData = checkToken(token);
    if (!userData) throw Error("Access denied");

    const checkUser = await prisma.user.findUnique({ where: { email } });
    if (checkUser)
      return NextResponse.json(
        { message: "email is already exist" },
        { status: 400 }
      );

    if (userData.role === "OWNER") {
      if(role !== "ADMIN") throw Error('Owner can only add admins')
    } else if (userData.role === "ADMIN") {
      if(role !== "SELLER") throw Error("Admin only can add sellers")
    } else {
      throw Error("You don't have permission to add users")
    }

    const user = await prisma.user.addOperator(email, password, userName, phone, role)
    
    return NextResponse.json(user, {status: 201})
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
