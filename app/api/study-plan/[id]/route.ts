import { HTTP_RESPONSES } from "@/definitions/enums/httpResponses";
import { getBody } from "@/lib/apiUtils/getBody";
import { getHeader } from "@/lib/apiUtils/getHeader";
import { prisma } from "@/prisma/prismaClient";
import { user } from "@prisma/client";
import { decodeJwt } from "jose";
import { NextResponse } from "next/server";

export async function  DELETE(
  req: any,
  {
    params
  }: {
    params: { id: string }
  }
) {
  const token = await getHeader(req, "token") as string
  const token_user = decodeJwt(token) as user
  try {
    const deletedPlan = await prisma.study_plan.delete({
      where: { plan_id: parseInt(params.id) }
    });
    await prisma.action_log.create({
      data: {
        action: "DELETE",
        user_id: token_user.user_id,
        additional_info: `plan_id: ${params.id}`
      }
    })
    return NextResponse.json(HTTP_RESPONSES[200](deletedPlan));
  } catch (error) {
    await prisma.action_log.create({
      data: {
        action: "X DELETE X",
        user_id: token_user.user_id,
        additional_info: `plan_id: ${params.id}, ${error}`
      }
    })
    return NextResponse.json(HTTP_RESPONSES[500](error));
  }
}

export async function PUT(
    req: any,
    {
      params
    }: {
      params: { id: string }
    }
  ) {
    const token = await getHeader(req, "token") as string
    const token_user = decodeJwt(token) as user
    try {
      const body = await getBody(req);
  
      const updatedPlan = await prisma.study_plan.update({
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
          is_approved: 0
        },
      })
  
      await prisma.action_log.create({
        data: {
          action: "UPDATE",
          user_id: token_user.user_id, 
          additional_info: `Updated plan id: ${params.id}`
        }
      })
      return NextResponse.json(HTTP_RESPONSES[200](updatedPlan));
    } catch (error) {
      await prisma.action_log.create({
        data: {
          action: "X UPDATE X",
          user_id: token_user.user_id, 
          additional_info: `Failed to update plan id: ${params.id}, ${error}`
        }
      })
      return NextResponse.json(HTTP_RESPONSES[500](error));
    }
  }
  // GET request to get a plan
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
            }
          }
      })
      .then((res) => NextResponse.json(HTTP_RESPONSES[200](res)))
      .catch((error) => NextResponse.json(HTTP_RESPONSES[500](error)));
    }