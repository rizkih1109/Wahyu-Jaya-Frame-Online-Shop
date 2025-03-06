import { checkToken } from "@/app/lib/helpers/util"
import { prisma } from "@/app/lib/prisma/prisma"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    try {
        const headers = req.headers.get('Authorization')
        if(!headers) throw Error('Unauthorization')

        const token = headers?.split(" ")[1]
        if(!token) throw Error('token is unavailable')

        const payload = checkToken(token)
        if(!payload) throw Error('payload failed')

        const {userName, phone, address} = await req.json()

        const user = await prisma.user.update({
            where: {id: payload.userid},
            data: {
                userName,
                phone,
                address
            }
        })

        return NextResponse.json(user)
    } catch (err) {
        if(err instanceof Error) {
            console.log(err)
            return NextResponse.json({message: 'profile failed'}, {status: 500})
        }
    }
}