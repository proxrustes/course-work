import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export interface plan_change{
    plan_id:number,
            change_date: string,
            user_id: number,
            change_description: string,
}

// GET request to fetch all plan_changes
export async function GET(req: any) {
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