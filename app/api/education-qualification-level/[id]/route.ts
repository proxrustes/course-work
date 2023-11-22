import { HTTP_RESPONSES } from "@/components/common/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// PUT request to update an education qualification level
export async function PUT(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const body = JSON.parse(req.body);
  
    return prisma.education_qualification_level.update({
      where: { level_id: parseInt(params.id) },
      data: {
        level_name: body.level_name,
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  // DELETE request to delete an education qualification level
export async function DELETE(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const { id } = req.params;
  
    return prisma.education_qualification_level.delete({
      where: { level_id: parseInt(id) },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200]))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  