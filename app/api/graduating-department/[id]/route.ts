import { HTTP_RESPONSES } from "@/components/common/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// PUT request to update a graduating department
export async function PUT(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const body = JSON.parse(req.body)
  
    return prisma.graduating_department.update({
      where: { department_id: parseInt(params.id) },
      data: {
        department_name: body.department_name,
        head: body.head,
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)))
  }
  