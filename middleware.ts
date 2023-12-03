import { NextResponse, NextRequest } from "next/server";
import { protectedRoutes } from "./router/routes";
import { ERROR_TYPES } from "./definitions/enums/errors";
import { verify } from "./lib/jwtUtils/verify";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("currentUser")?.value;
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      req.nextUrl.pathname = `/error/${ERROR_TYPES.ACCESS_DENIED}`;
      return NextResponse.redirect(req.nextUrl);
    }
    const isValidToken = await verify(token);
    if (!isValidToken) {
      return redirectWithDelete(req, "/");
    }
  }
  return NextResponse.next();
}

function redirectWithDelete(req: NextRequest, url: string) {
  req.cookies.delete("currentUser");
  const response = NextResponse.redirect(new URL(url, req.url));
  response.cookies.delete("currentUser");
  return response;
}
