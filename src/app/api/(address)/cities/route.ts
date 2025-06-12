import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const provinceId = searchParams.get("provinceId");

    if (!provinceId) throw Error("provinceId doesn't exist");

    const response = await prisma.city.findMany({
      where: {
        provinceId,
      },
    });

    return NextResponse.json(response);
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
