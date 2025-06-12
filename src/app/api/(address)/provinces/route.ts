import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.province.findMany();
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
