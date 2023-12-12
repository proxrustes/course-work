import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { getHeader } from "@/lib/apiUtils/getHeader";
import { prisma } from "@/prisma/prismaClient";
import { user } from "@prisma/client";
import { decodeJwt } from "jose";
import { NextResponse, userAgent } from "next/server";

// POST request to create a new report
export async function POST(req: any) {
    const token = await getHeader(req, "token") as string
    const token_user = decodeJwt(token) as user
    const body = await getBody(req)

    return prisma.report.create({
        data: {
            report_name: `${token_user.name} log`,
            text: body.text,
            generation_date: new Date(), 
            user_id: token_user.user_id,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) 
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all reports
export async function GET(req: any) {
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