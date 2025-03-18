import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "../lib/helpers/util";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
  
    const payload = checkToken(token);
  
    if (payload?.role === "seller") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (payload?.role === "customer") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  
    return NextResponse.next();
  }
  