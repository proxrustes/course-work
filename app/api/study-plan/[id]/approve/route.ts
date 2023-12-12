import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { getHeader } from "@/lib/apiUtils/getHeader";
import { prisma } from "@/prisma/prismaClient";
import { user } from "@prisma/client";
import { decodeJwt } from "jose";
import { NextResponse } from "next/server";

// PUT request to update a plan
export async function PUT(
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
  
      const updatedPlan = await prisma.study_plan.update({
        where: { plan_id: parseInt(params.id) },
        data: {
          is_approved: parseInt(body.is_approved)
        },
      });
  
      await prisma.action_log.create({
        data: {
          action: "UPDATE",
          user_id: token_user.user_id,
          additional_info: `plan id: ${params.id}`
        }
      });
  
      return NextResponse.json(HTTP_RESPONSES[200](updatedPlan));
    } catch (error) {
      await prisma.action_log.create({
        data: {
          action: "X UPDATE X",
          user_id: token_user.user_id,
          additional_info: `plan id: ${params.id}, ${error}`
        }
      });
  
      return NextResponse.json(HTTP_RESPONSES[500](error));
    }
  }