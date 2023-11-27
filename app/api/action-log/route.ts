import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new action_log
export async function POST(req: any) {
    const body = JSON.parse(req.body);

    return prisma.action_log.create({
        data: {
            action: body.action,
            user_id: body.user_id,
            additional_info: body.additional_info,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all action_logs
export async function GET(req: any) {
    return prisma.action_log.findMany({
        select: {
            action_log_id: true,
            action: true,
            user_id: true,
            additional_info: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}