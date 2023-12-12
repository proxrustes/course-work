import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

  // GET request to fetch all education qualification levels
export async function GET(req: any) {
    return prisma.education_qualification_level.findMany({
      select: {
        level_id: true,
        level_name: true,
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  