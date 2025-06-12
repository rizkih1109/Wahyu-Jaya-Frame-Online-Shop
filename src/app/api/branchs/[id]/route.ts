import { checkToken } from "@/lib/helpers/util";
import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context : { params: { id: string } }
) {
  try {
    const id = Number(context.params.id)
    const {
      branchName,
      adminId,
      storeId,
      provinceId,
      cityId,
      districtId,
      villageId,
      street,
    } = await req.json();

    const token = req.headers.get("Authorization")?.slice(7);
    if (!token) throw Error("token is not valid");

    const owner = checkToken(token as string);
    if (!owner) throw Error("access denied");

    if (adminId) {
      const admin = await prisma.user.findUnique({
        where: {
          id: adminId,
        },
      });

      if (admin?.branchId)
        throw Error("This user has been admin in another branch");
    }

    const branch = await prisma.branch.update({
      where: { id: Number(id) },
      data: {
        branchName,
        storeId,
        provinceId,
        cityId,
        districtId,
        villageId,
        street,
        ...(adminId && { adminId }),
      },
    });

    if (adminId) {
      await prisma.user.update({
        where: { id: adminId },
        data: { branchId: branch.id },
      });
    }

    return NextResponse.json(branch, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("Authorization")?.slice(7);
    if (!token) throw Error("token is not valid");

    const owner = checkToken(token as string);
    if (!owner) throw Error("access denied");

    const id = Number(params.id);
    const branch = await prisma.branch.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(branch, { status: 200 });
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
