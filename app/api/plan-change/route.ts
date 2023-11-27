import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new plan_change
export async function POST_plan_change(req: any) {
    const body = JSON.parse(req.body);

    return prisma.plan_change.create({
        data: {
            plan_id: body.plan_id,
            change_date: new Date(), // Assuming current date for creation
            user_id: body.user_id,
            change_description: body.change_description,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all plan_changes
export async function GET_plan_change(req: any) {
    return prisma.plan_change.findMany({
        select: {
            change_id: true,
            plan_id: true,
            change_date: true,
            user_id: true,
            change_description: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}