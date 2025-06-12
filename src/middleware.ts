import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  console.log(token, "MIDDLEWATE RUNNING");
   
  const { pathname } = req.nextUrl;
  const isPublicPath = pathname === "/login";

  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL("/login", req.url));

  // const payload = checkToken(token);

  // if (isPublicPath || token) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
