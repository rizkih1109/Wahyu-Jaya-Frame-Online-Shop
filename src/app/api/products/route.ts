import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const page = Number(request.nextUrl.searchParams.get('page')) || 1
    const keyword = request.nextUrl.searchParams.get('keyword') || ''
    try {
        const data = await prisma.product.findMany({
            where: {
                name: keyword
            },
            skip: (page - 1) * 10,
            take: 10
        })
        return NextResponse.json({ status: 200, data })
    } catch (error: unknown) {
        return NextResponse.json({ status: 400, message: (error as Error).message })
    }
}

export async function POST(request: NextRequest) {
    const input = await request.json() as unknown
    try {
        const data = await prisma.product.create({
            data: input as {name: string, price: number, stock: number}
        })
        return NextResponse.json({status: 201, data})
    } catch (error: unknown) {
        return NextResponse.json({status: 400, message: (error as Error).message})
    }
}