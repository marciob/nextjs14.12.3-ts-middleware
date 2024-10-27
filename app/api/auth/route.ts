import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.SECRET_PASSWORD;

  if (password === correctPassword) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
