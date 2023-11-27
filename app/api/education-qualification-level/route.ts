import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new education qualification level
export async function POST(req: any) {
    const body = JSON.parse(req.body);
  
    return prisma.education_qualification_level.create({
      data: {
        level_name: body.level_name,
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
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
  