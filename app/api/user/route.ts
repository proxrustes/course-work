import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses"
import { prisma } from "@/prisma/prismaClient"
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
  
      return await prisma.user
      .findMany({
        select: {
            user_id: true,
            name: true,
            access_level: true
        }
      })
      .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
      .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)))
    
  }
  