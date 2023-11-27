import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new faculty_institute
export async function POST_faculty_institute(req: any) {
    const body = JSON.parse(req.body);

    return prisma.faculty_institute.create({
        data: {
            faculty_name: body.faculty_name,
            dean: body.dean,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all faculty_institutes
export async function GET_faculty_institute(req: any) {
    return prisma.faculty_institute.findMany({
        select: {
            faculty_id: true,
            faculty_name: true,
            dean: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}