import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// GET request to fetch all faculty_institutes
export async function GET(req: any) {
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