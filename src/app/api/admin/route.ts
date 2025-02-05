import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
export async function GET() {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return NextResponse.json(
      { message: "You are not authorized to view this page" },
      { status: 403 }
    );
  }
  return NextResponse.json(
    { message: "You are authorized to view this page" },
    { status: 200 }
  );
}
