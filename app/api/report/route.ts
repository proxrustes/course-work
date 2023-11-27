import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// POST request to create a new report
export async function POST_report(req: any) {
    const body = JSON.parse(req.body);

    return prisma.report.create({
        data: {
            report_name: body.report_name,
            text: body.text,
            generation_date: new Date(), // Assuming current date for creation
            user_id: body.user_id,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) // HTTP 201 Created
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all reports
export async function GET_report(req: any) {
    return prisma.report.findMany({
        select: {
            report_id: true,
            report_name: true,
            text: true,
            generation_date: true,
            user_id: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}