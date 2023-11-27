import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";


// POST request to create a new qualification
export async function POST(req: any) {
    const body = JSON.parse(req.body);

    return prisma.qualification.create({
        data: {
            qualification_name: body.qualification_name,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all qualifications
export async function GET(req: any) {
    return prisma.qualification.findMany({
        select: {
            qualification_id: true,
            qualification_name: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}