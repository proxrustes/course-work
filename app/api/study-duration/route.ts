import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";


// POST request to create a new study_duration
export async function POST_study_duration(req: any) {
    const body = JSON.parse(req.body);

    return prisma.study_duration.create({
        data: {
            duration_length: body.duration_length,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all study_durations
export async function GET_study_duration(req: any) {
    return prisma.study_duration.findMany({
        select: {
            duration_id: true,
            duration_length: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}