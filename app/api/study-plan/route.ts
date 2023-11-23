import { HTTP_RESPONSES } from "@/components/common/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export interface study_plan{
  title: string,
  text: string,
  subject: {subject_id: number, subject_name: string},
  creation_date: string,
  is_approved: number
}

  // GET request to fetch all study_plan
export async function GET(req: any) {
    return prisma.study_plan.findMany({
      select:{
        title: true,
        is_approved: true,
        subject: {
          select:{
            subject_id: true,
            subject_name: true
          }
        },
        text: true,
        creation_date: true
      }
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  