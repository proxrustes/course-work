import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new training direction
export async function POST(req: any) {
    const body = await getBody(req);
  
    return prisma.training_direction.create({
      data: {
        direction_name: body.direction_name,
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }

  // GET request to fetch all training directions
export async function GET() {
    return prisma.training_direction.findMany({
      select: {
        direction_id: true,
        direction_name: true,
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
