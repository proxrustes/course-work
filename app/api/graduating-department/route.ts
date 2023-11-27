import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new graduating_department
export async function POST_graduating_department(req: any) {
    const body = JSON.parse(req.body);

    return prisma.graduating_department.create({
        data: {
            department_name: body.department_name,
            head: body.head,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all graduating_departments
export async function GET_graduating_department(req: any) {
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