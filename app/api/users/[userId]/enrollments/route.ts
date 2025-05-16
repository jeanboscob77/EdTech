// app/api/users/[userId]/enrollments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Users from "@/lib/users";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    await connectDB();

    const user = await Users.findById(userId).populate("enrolledCourses");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const enrolledCourses = user.enrolledCourses.map((course: any) =>
      course._id.toString()
    );

    return NextResponse.json({ enrolledCourses }, { status: 200 });
  } catch (error) {
    console.error("GET /enrollments error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
