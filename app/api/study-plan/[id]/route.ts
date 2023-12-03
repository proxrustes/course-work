import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

// PUT request to update a plan
export async function PUT(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const body = await getBody(req)
    return prisma.study_plan.update({
      where: { plan_id: parseInt(params.id) },
      data: {
        text: body.text,
        title: body.title,
        speciality_id: parseInt(body.speciality_id),
        level_id: parseInt(body.level_id),
        department_id: parseInt(body.department_id),
        faculty_id: parseInt(body.faculty_id),
        subject_id: parseInt(body.subject_id),
        form_id: parseInt(body.form_id),
        duration_id: parseInt(body.duration_id),
        qualification_id: parseInt(body.qualification_id),
      },
    })
    .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
    .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
  }
  // PUT request to update a plan
  export async function GET(
      req: any,
      {
        params
      }: {
        params: { id: string }
      }
    ) {    
      return prisma.study_plan.findFirst({
        where: { plan_id: parseInt(params.id) },
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
            },
            qualification: {
              select:{
                qualification_name: true,
                qualification_id: true
              }
            },
          }
      })
      .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
      .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
    }