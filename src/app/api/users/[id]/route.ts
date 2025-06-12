import { checkToken } from "@/lib/helpers/util";
import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const data = await req.json();
    const { branchId } = data;

    const token = req.headers.get("Authorization")?.slice(7);
    if (!token) throw Error("Token is not valid");

    const userData = checkToken(token);
    if (!userData) throw Error("Access denied");

    const branch = await prisma.branch.findUnique({
      where: { id: branchId },
    });

    if (branch?.adminId) throw Error("This branch has already admin");

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    await prisma.branch.update({
      where: {id: branchId}, 
      data: {adminId: user.id}
    })

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(user);
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
