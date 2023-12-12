import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new subject
export async function POST(req: any) {
    const body = JSON.parse(req.body);

    return prisma.subject.create({
        data: {
            subject_name: body.subject_name,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all subjects
export async function GET(req: any) {
    return prisma.subject.findMany({
        select: {
            subject_id: true,
            subject_name: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}