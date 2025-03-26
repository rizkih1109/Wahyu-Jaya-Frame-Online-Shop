import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const data = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json({ status: 200, data })
    } catch (error: unknown) {
        return NextResponse.json({ status: 400, message: (error as Error).message })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const input = await request.json() as unknown
    try {
        const data = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: input as { name: string, price: number, stock: number }
        })
        return NextResponse.json({ status: 201, data })
    } catch (error: unknown) {
        return NextResponse.json({ status: 400, message: (error as Error).message })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json({ status: 204 })
    } catch (error: unknown) {
        return NextResponse.json({ status: 400, message: (error as Error).message })
    }
}