import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new speciality
export async function POST(req: any) {
    const body = await getBody(req);
  
    return prisma.speciality.create({
      data: {
        speciality_name: body.speciality_name,
        direction_id: parseInt(body.direction_id),
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  
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
  