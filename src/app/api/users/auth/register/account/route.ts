import { createAccessToken, createRefreshToken } from "@/lib/helpers/util";
import { prisma } from "@/lib/prisma/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, repassword } = await req.json();

    if (password !== repassword) throw Error("password doesn't match");

    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (checkUser) throw Error("Email is already exist");

    const user = await prisma.user.signUp(email, password);

    const refreshToken = createRefreshToken({ userid: user.id, role: 'CUSTOMER' });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return NextResponse.json({
        email: user.email,
        refreshToken,
        accessToken: createAccessToken({userid: user.id, role:'CUSTOMER'})
    })
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
}
