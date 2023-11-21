import { HTTP_RESPONSES } from "@/components/common/enums/httpResponses"
import { getBody } from "@/lib/apiUtils/getBody"
import { sign } from "@/lib/jwtUtils/sign"
import { prisma } from "@/prisma/prismaClient"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: any) {
    const KEY = process.env.JWT_KEY
    const password = (await getBody(req)).password
    if (password === undefined) {
      return NextResponse.json(HTTP_RESPONSES[400]("password"))
    }
    if (!KEY) {
      return NextResponse.json(HTTP_RESPONSES[500]("token encoding failed"))
    }
    const db_user = await prisma.user.findFirst({
      where: {
        password: password
      },
      select: {
        user_id: true,
        name: true,
        access_level: true
      }
    })
    if (db_user) {
      const jwt = await sign(
        {
          id: db_user.user_id,
          name: db_user.name,
          access_level: db_user.access_level
        },
        KEY
      )
      cookies().set("currentUser", jwt)
      return NextResponse.json(HTTP_RESPONSES[200](jwt))
    } else {
      return NextResponse.json(HTTP_RESPONSES[401])
    }
  }
  