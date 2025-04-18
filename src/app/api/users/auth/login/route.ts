import {
  checkPassword,
  createAccessToken,
  createRefreshToken,
} from "@/lib/helpers/util";
import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
      omit: {
        password: false,
      },
    });

    if (!(user && checkPassword(password, user.password)))
      return NextResponse.json(
        { message: "email or password is wrong" },
        { status: 401 }
      );

    const refreshToken = createRefreshToken({ userid: user.id, role: user.role });
    const accessToken = createAccessToken({ userid: user.id, role: user.role });
    const role = user.role;

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const response = NextResponse.json({
      message: "login is successfull",
      accessToken,
      refreshToken,
      role,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return response;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
