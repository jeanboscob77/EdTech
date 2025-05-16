import { connectDB } from "@/lib/db";
import Users from "@/lib/users";
import "@/lib/models/courses"; // Required to register Course model
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const user = await Users.findById(userId).populate("enrolledCourses");
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(user.enrolledCourses, { status: 200 });
    }

    // ✅ Handle missing userId
    return NextResponse.json(
      { message: "Missing userId in query" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
