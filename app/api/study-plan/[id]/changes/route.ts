import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { getHeader } from "@/lib/apiUtils/getHeader";
import { prisma } from "@/prisma/prismaClient";
import { user } from "@prisma/client";
import { decodeJwt } from "jose";
import { NextResponse } from "next/server";

export interface plan_change{
  change_id: number,
    plan_id:number,
            change_date: string,
            user: {user_id: number, name: string},
            change_description: string,
}

export async function POST(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const token = await getHeader(req, "token") as string;
  const token_user = decodeJwt(token) as user;

  try {
    const body = await getBody(req);

    const newPlanChange = await prisma.plan_change.create({
      data: {
        plan_id: parseInt(params.id),
        change_date: new Date(),
        user_id: parseInt(body.user_id),
        change_description: body.change_description,
      }
    });

    await prisma.action_log.create({
      data: {
        action: "CREATE",
        user_id: token_user.user_id,
        additional_info: `plan change ${newPlanChange.change_id} for plan_id: ${params.id}`
      }
    });

    return NextResponse.json(HTTP_RESPONSES[200](newPlanChange));
  } catch (error) {
    await prisma.action_log.create({
      data: {
        action: "X CREATE X",
        user_id: token_user.user_id,
        additional_info: `Failed to create plan change for plan_id: ${params.id}, ${error}`
      }
    });

    return NextResponse.json(HTTP_RESPONSES[500](error));
  }
}

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