import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const PUBLIC_PATHS = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/store",
  "/privacy",
  "/terms",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("suscriptionUser");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const key = process.env.CRYPTO_SECRET || "";
  const sessionDateString = CryptoJS.AES.decrypt(
    String(token.value),
    key
  ).toString(CryptoJS.enc.Utf8);

  const dateCookie = new Date(sessionDateString);
  const currentDateString = new Date()
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "/");
  const currentDate = new Date(currentDateString);

  if (currentDate >= dateCookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
