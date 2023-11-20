import { NextResponse } from "next/server"
import { parse } from "../jwtUtils/parse"
import { cookies } from "next/headers"
import { HTTP_RESPONSES } from "@/components/common/enums/httpResponses"

export async function executeIfValid(
  req: Request,
  rolePermissions: string[],
  callback: Function
) {
  const token = cookies().get("currentUser")

  if (token === undefined) {
    return NextResponse.json(HTTP_RESPONSES[401])
  }
  const user = await parse(token.value)
  if (!user) {
    return NextResponse.json(HTTP_RESPONSES[401])
  }
  if (!rolePermissions.includes(user.role)) {
    return NextResponse.json(HTTP_RESPONSES[403])
  }

  try {
    return await callback(user)
  } catch (error) {
    return NextResponse.json(HTTP_RESPONSES[500](error))
  }
}