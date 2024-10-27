import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const [scheme, encoded] = basicAuth.split(" ");

    if (scheme === "Basic") {
      const decoded = Buffer.from(encoded, "base64").toString();
      const [username, password] = decoded.split(":");

      if (password === process.env.SECRET_PASSWORD) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: "/",
};
