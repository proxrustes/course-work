import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export interface plan_change{
  change_id: number,
    plan_id:number,
            change_date: string,
            user: {user_id: number, name: string},
            change_description: string,
}

// POST request to create a new plan_change
export async function POST(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const body = await getBody(req);

    return prisma.plan_change.create({
        data: {
            plan_id: parseInt(params.id),
            change_date: new Date(),
            user_id: body.user_id,
            change_description: body.change_description,
        }
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res))) 
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}

// GET request to fetch all plan_changes
export async function GET(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    return prisma.plan_change.findMany({
        where:{
            plan_id: parseInt(params.id)
        },
        select: {
            change_id: true,
            change_date: true,
            user: {
                select:{
                    user_id: true,
                    name: true
                }
            },
            change_description: true,
        },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}