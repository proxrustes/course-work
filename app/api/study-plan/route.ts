import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { getHeader } from "@/lib/apiUtils/getHeader";
import { prisma } from "@/prisma/prismaClient";
import { user } from "@prisma/client";
import { decodeJwt } from "jose";
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

  export async function POST(req: any) {
    const token = await getHeader(req, "token") as string
    const token_user = decodeJwt(token) as user
    try {
      const body = await getBody(req);

      const plan = await prisma.study_plan.create({
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
      });
  
      await prisma.action_log.create({
        data: {
          action: "ADD",
          user_id: token_user.user_id,
          additional_info: `plan id: ${plan.plan_id}`
        }
      });
      return NextResponse.json(HTTP_RESPONSES[200](plan));
    } catch (error) {
      await prisma.action_log.create({
        data: {
          action: "X ADD X",
          user_id: token_user.user_id, 
          additional_info: `Failed to add plan, ${error}`
        }
      })
      return NextResponse.json(HTTP_RESPONSES[500](error));
    }
  }
  