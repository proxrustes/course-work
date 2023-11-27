import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export interface study_plan {
  title: string;
  text: string;
  subject: { subject_id: number; subject_name: string };
  creation_date: string;
  is_approved: number;
  speciality_id: number;
  level_id: number;
  department_id: number;
  faculty_id: number;
  form_id: number;
  duration_id: number;
  qualification_id: number;
}

// GET request to fetch all study_plan with all fields
export async function GET(req: any) {
  return prisma.study_plan.findMany({
    select: {
      title: true,
      text: true,
      subject: {
        select: {
          subject_id: true,
          subject_name: true,
        },
      },
      creation_date: true,
      is_approved: true,
      speciality_id: true,
      level_id: true,
      department_id: true,
      faculty_id: true,
      form_id: true,
      duration_id: true,
      qualification_id: true,
    },
  })
  .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
  .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}



  // POST request to create a new study plan
export async function POST(req: any) {
  const body = await getBody(req);

  return prisma.study_plan.create({
    data: {
      is_approved: body.is_approved,
      speciality_id: body.speciality_id,
      level_id: body.level_id,
      department_id: body.department_id,
      faculty_id: body.faculty_id,
      subject_id: body.subject_id,
      form_id: body.form_id,
      duration_id: body.duration_id,
      qualification_id: body.qualification_id,
      creation_date: new Date(), 
      title: body.title,
      text: body.text
    },
  })
  .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
  .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}