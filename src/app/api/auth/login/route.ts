import { NextRequest, NextResponse } from "next/server";
import users from "@/data/users.json";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sdjhjcbdcbjdhzbjdzh";

type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = users.find((u: User) => u.email === email);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  const response = NextResponse.json({
    user: { name: user.name, email: user.email },
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });
  return response;
}
