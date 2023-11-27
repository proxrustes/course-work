import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

  // PUT request to update a training direction
  export async function PUT(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const body = await getBody(req);
  
    return prisma.training_direction.update({
      where: { direction_id: parseInt(params.id) },
      data: {
        direction_name: body.direction_name,
      },
    })
    .then((res: any) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error: any) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  // DELETE request to delete a training direction
export async function DELETE(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    return prisma.training_direction.delete({
      where: { direction_id: parseInt(params.id) },
    })
    .then((res: any) => NextResponse.json(HTTP_RESPONSES[200])) // HTTP 204 No Content
    .catch((error: any) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  
  