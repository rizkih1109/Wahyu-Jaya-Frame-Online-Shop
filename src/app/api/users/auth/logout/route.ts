import { prisma } from "@/lib/prisma/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url)
        const refreshToken = searchParams.get("refreshToken")

        await prisma.user.updateMany({
            where: {refreshToken},
            data: {
                refreshToken: null
            }
        })

        return NextResponse.json({message: 'logout is successfully'}, {status: 200})
    } catch (err) {
        if(err instanceof Error) {
            console.log(err)
            return NextResponse.json({message: err.message}, {status: 400})
        }
    }
}