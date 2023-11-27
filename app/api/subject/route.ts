import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new subject
export async function POST_subject(req: any) {
    const body = JSON.parse(req.body);

    return prisma.subject.create({
        data: {
            subject_name: body.subject_name,
            hours_count: body.hours_count,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all subjects
export async function GET_subject(req: any) {
    return prisma.subject.findMany({
        select: {
            subject_id: true,
            subject_name: true,
            hours_count: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}