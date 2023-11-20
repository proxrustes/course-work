import { HTTP_RESPONSES } from "@/components/common/enums/httpResponses"
import { executeIfValid } from "@/lib/securityUtils/executeIfValid"
import { prisma } from "@/prisma/prismaClient"
import { User } from "@prisma/client"
import { NextResponse } from "next/server"

// Get users by project id
export async function GET(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    return await executeIfValid(req, [], async (user: User) => {
      if (!user) {
        return NextResponse.json(HTTP_RESPONSES[401])
      }
  
      return await prisma.user
      .findMany({
        select: {
            User_ID: true,
            Name: true,
            Access_Level: true
        }
      })
      .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
      .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)))
    })
  }
  