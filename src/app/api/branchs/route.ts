import { checkToken } from "@/lib/helpers/util";
import { prisma } from "@/lib/prisma/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // const token = req.headers.get("Authorization")?.slice(7);
    const token = (await cookies()).get("accessToken")?.value;

    console.log(token, 'ini token')

    if (!token) throw Error("token is not valid");

    const owner = checkToken(token as string);
    if (!owner) throw Error("access denied");

    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "asc";
    const keyword = searchParams.get("keyword") || "";
    const sortBy = searchParams.get("sortBy") || "id";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const offset = (page - 1) * limit;

    const sortContent = ["id", "branchName"];
    const sortField = sortContent.includes(sortBy) ? sortBy : "id";

    const where = keyword
      ? {
          OR: [
            {
              branchName: {
                contains: keyword,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              admin: {
                userName: {
                  contains: keyword,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            },
          ],
        }
      : {};

    const [branchs, total] = await Promise.all([
      await prisma.branch.findMany({
        skip: offset,
        take: limit,
        where,
        include: {
          admin: {
            select: {
              id: true,
              userName: true,
            },
          },
          province: true,
          city: true,
          district: true,
          village: true
        },
        orderBy: {
          [sortField]: sort === "desc" ? "desc" : "asc",
        },
      }),

      await prisma.branch.count({ where }),
    ]);

    const pages = Math.ceil(total / limit);

    return NextResponse.json({
      data: branchs,
      total,
      page,
      pages,
      limit,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
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
      const checkAdmin = await prisma.branch.findFirst({
        where: {
          adminId,
        },
      });

      const admin = await prisma.user.findUnique({
        where: {
          id: adminId,
        },
      });

      if (admin?.role !== "ADMIN") throw Error("His role is not an admin");
      if (checkAdmin) throw Error("Admin has placement");
    }

    const city = await prisma.city.findUnique({
      where: { id: cityId },
      include: { province: true },
    });

    if (!city) throw Error("city doesn't exist");
    if (city.provinceId !== provinceId)
      throw Error("city and province doesn't match");

    const district = await prisma.district.findUnique({
      where: { id: districtId },
      include: { city: true },
    });

    if (!district) throw Error("district doesn't match");
    if (district.cityId !== cityId)
      throw Error("district and city doesn't match");

    const village = await prisma.village.findUnique({
      where: { id: villageId },
      include: { district: true },
    });

    if (!village) throw Error("village doesn't match");
    if (village.districtId !== districtId)
      throw Error("village and district doesn't match");

    const branch = await prisma.branch.create({
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

    return NextResponse.json(branch, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
