import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";
  // GET request to fetch all specialities
export async function GET(req: any) {
    return prisma.speciality.findMany({
      select: {
        speciality_id: true,
        speciality_name: true,
        direction_id: true,
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  