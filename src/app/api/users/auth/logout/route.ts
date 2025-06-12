import { prisma } from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get("refreshToken")?.value;

    if (!refreshToken) throw Error("logout is failed");

    await prisma.user.updateMany({
      where: { refreshToken },
      data: {
        refreshToken: null,
      },
    });

    const response = NextResponse.json({ message: "Logout success" });
    response.cookies.set("refreshToken", "", {
      maxAge: 0,
      path: "/",
    });
    response.cookies.set("accessToken", "", {
        httpOnly: true,
        maxAge: 60 * 60,
      });

    return response
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
}
