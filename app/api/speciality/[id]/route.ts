import { HTTP_RESPONSES } from "@/components/common/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// PUT request to update a speciality
export async function PUT(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const body = await getBody(req);
  
    return prisma.speciality.update({
      where: { speciality_id: parseInt(params.id) },
      data: {
        speciality_name: body.speciality_name,
        direction_id: parseInt(body.direction_id),
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  
  // DELETE request to delete a speciality
export async function DELETE(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
  
    return prisma.speciality.delete({
      where: { speciality_id: parseInt(params.id) },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200])) // HTTP 204 No Content
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  