import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stores = await prisma.store.findMany();
    return NextResponse.json(stores);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json(
        { message: "get stores failed" },
        { status: 500 }
      );
    }
  }
}

export async function POST(req:Request) {
  try {
    const {storeName, ownerId} = await req.json()
    const store = await prisma.store.create({
      data: {
        storeName, ownerId
      }
    })
    return NextResponse.json(store)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json(
        { message: "add store failed" },
        { status: 500 }
      );
    }
  }
}
