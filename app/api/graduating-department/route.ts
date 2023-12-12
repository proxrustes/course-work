import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// GET request to fetch all graduating_departments
export async function GET(req: any) {
    return prisma.graduating_department.findMany({
        select: {
            department_id: true,
            department_name: true,
            head: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}