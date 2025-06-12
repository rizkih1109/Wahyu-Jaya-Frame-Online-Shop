import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const districtId = searchParams.get("districtId");

    if (!districtId) throw Error("district doesn't exist");

    const response = await prisma.village.findMany({
      where: { districtId },
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
