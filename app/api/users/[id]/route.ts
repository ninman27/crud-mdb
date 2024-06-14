import { deleteUser, fetchUser, updateUser } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function DELETE(request: any, context: any) {
  const { id } = context.params;
  try {
    await deleteUser(id);
    return NextResponse.json({
      message: "User deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}

export async function GET(request: any, context: any) {
  const { id } = context.params;
  try {
    const user = await fetchUser(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}

export async function PUT(request: any, context: any) {
  const { id } = context.params;
  const updateData = await request.json();
  try {
    await updateUser(id, updateData);
    return NextResponse.json({
      message: "User is successfully updated!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
