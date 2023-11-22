import { HTTP_RESPONSES } from "@/components/common/enums/httpResponses";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";


  // GET request to fetch all study_plan
export async function GET(req: any) {
    return prisma.study_plan.findMany()
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  