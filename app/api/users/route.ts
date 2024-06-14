import { NextResponse } from "next/server";
import { createUser, fetchUsers } from "@/app/lib/models";

export async function GET() {
  try {
    const users = await fetchUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: any) {
  try {
    const user = await request.json();
    const newUser = await createUser(user);
    return NextResponse.json({ _id: newUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
