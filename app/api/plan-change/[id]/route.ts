import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getHeader } from "@/lib/apiUtils/getHeader";
import { prisma } from "@/prisma/prismaClient";
import { user } from "@prisma/client";
import { decodeJwt } from "jose";
import { NextResponse } from "next/server";

  export async function DELETE(
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
    const deletedPlanChange = await prisma.plan_change.delete({
      where: { change_id: parseInt(params.id) },
    });

    await prisma.action_log.create({
      data: {
        action: "DELETE",
        user_id: token_user.user_id,
        additional_info: `Deleted plan change id: ${params.id}`
      }
    });

    return NextResponse.json(HTTP_RESPONSES[200](deletedPlanChange));
  } catch (error) {
    await prisma.action_log.create({
      data: {
        action: "X DELETE X",
        user_id: token_user.user_id,
        additional_info: `Failed to delete plan change id: ${params.id}, ${error}`
      }
    });

    return NextResponse.json(HTTP_RESPONSES[500](error));
  }
  }