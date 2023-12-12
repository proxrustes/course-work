import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export interface study_plan {
  plan_id: number,
  title: string;
  text: string;
  subject: { subject_id: number; subject_name: string };
  creation_date: string;
  is_approved: number;
  speciality: { speciality_id: number; speciality_name: string };
  level: { level_id: number; level_name: string };
  department: { department_id: number; department_name: string };
  faculty: { faculty_id: number; faculty_name: string };
  form: { form_id: number; form_name: string };
  duration: { duration_id: number; duration_length: string };
}

// GET request to fetch all study_plan with all fields
export async function GET(req: any) {
  return prisma.study_plan.findMany({
    select: {
      plan_id: true,
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
      speciality: {
        select: {
          speciality_id: true,
          speciality_name: true
        }
      },
      level:{
        select:{
          level_id: true,
          level_name: true
        }
      },
      department:{
        select:{
          department_id: true,
          department_name: true
        }
      },
      faculty: {
        select:{
          faculty_id: true,
          faculty_name: true
        }
      },
      form: {
        select:{
          form_id: true,
          form_name: true
        }
      },
      duration: {
        select:{
          duration_id: true,
          duration_length: true
        }
      }
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
      creation_date: new Date(), 
      title: body.title,
      text: body.text
    },
  })
  .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
  .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
}