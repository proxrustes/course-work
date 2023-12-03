import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

  // DELETE request to delete an education qualification level
  export async function DELETE(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {  
    return prisma.plan_change.delete({
      where: { change_id: parseInt(params.id) },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200]))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }