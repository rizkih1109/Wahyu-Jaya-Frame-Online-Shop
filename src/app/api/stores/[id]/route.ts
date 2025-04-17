import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const data = await req.json();
    const store = await prisma.store.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(store);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json(
        { message: "edit store failed" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id
    const store = await prisma.store.delete({
        where: {id: Number(id)}
    })

    return NextResponse.json(store)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json(
        { message: "delete store failed" },
        { status: 500 }
      );
    }
  }
}
