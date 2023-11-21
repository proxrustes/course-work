import { NextResponse, NextRequest } from "next/server"
import { decodeJwt } from "jose"
import { protectedRoutes, superuserRoutes } from "./router/routes"
import { ERROR_TYPES } from "./components/common/enums/errors"
import { verify } from "./lib/jwtUtils/verify"
import { parse } from "./lib/jwtUtils/parse"
import { user } from "@prisma/client"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("currentUser")?.value
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      req.nextUrl.pathname = `/error/${ERROR_TYPES.ACCESS_DENIED}`
      return NextResponse.redirect(req.nextUrl)
    }
    const isValidToken = await verify(token)
    if (!isValidToken) {
      return redirectWithDelete(req, "/")
    }
    const user = (await parse(token)) as user
    if (superuserRoutes.includes(req.nextUrl.pathname)) {
      req.nextUrl.pathname = `/error/${ERROR_TYPES.ACCESS_DENIED}`
      return NextResponse.redirect(req.nextUrl)
    }
  }
  return NextResponse.next()
}

function redirectWithDelete(req: NextRequest, url: string) {
  req.cookies.delete("currentUser")
  const response = NextResponse.redirect(new URL(url, req.url))
  response.cookies.delete("currentUser")
  return response
}
