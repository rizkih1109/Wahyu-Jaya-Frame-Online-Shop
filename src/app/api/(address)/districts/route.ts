import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cityId = searchParams.get("cityId");

    if (!cityId) throw Error("city doesn't exist");

    const response = await prisma.district.findMany({
      where: {
        cityId,
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
