import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import users from "@/data/users.json";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "Server misconfiguration: JWT_SECRET is not set" },
        { status: 500 },
      );
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = users.find((u) => {
      return u.id === decoded.id;
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      user: { name: user.name, email: user.email },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
