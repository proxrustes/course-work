import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new form_of_study
export async function POST(req: any) {
    const body = JSON.parse(req.body);

    return prisma.form_of_study.create({
        data: {
            form_name: body.form_name,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all form_of_studies
export async function GET(req: any) {
    return prisma.form_of_study.findMany({
        select: {
            form_id: true,
            form_name: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}