import { connectDB } from "@/lib/db";
import Users from "@/lib/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const GET = async (req: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");

    // 🧠 Return enrolled courses only
    if (userId && type === "enrollments") {
      const user = await Users.findById(userId).populate("enrolledCourses");
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { enrolledCourses: user.enrolledCourses },
        { status: 200 }
      );
    }

    // 💡 Return user info by ID
    if (userId) {
      const user = await Users.findById(userId);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(user, { status: 200 });
    }

    // 🧾 Return all users
    const users = await Users.find();
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connectDB();
    const body = await req.json();
    const { firstname, lastname, dateOfBirth, email, password } = body;
    const isEmailExist: any = await Users.findOne({ email });

    if (isEmailExist)
      return NextResponse.json(
        { msg: "User Already Exist !!!" },
        { status: 400 }
      );

    const hashed = await bcrypt.hash(password, 10);
    if (!firstname || !lastname || !dateOfBirth || !email || !password)
      return NextResponse.json({ msg: "All fields required" }, { status: 400 });
    const newUser = new Users({
      firstname,
      lastname,
      dateOfBirth,
      email,
      password: hashed,
      role: "student",
    });
    await newUser.save();
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, courseId, enroll } = body;

    if (!userId || !courseId || typeof enroll !== "boolean") {
      return NextResponse.json(
        { msg: "userId, courseId, and enroll (boolean) are required" },
        { status: 400 }
      );
    }

    const update = enroll
      ? { $addToSet: { enrolledCourses: courseId } } // Enroll
      : { $pull: { enrolledCourses: courseId } }; // Unenroll

    const updatedUser = await Users.findByIdAndUpdate(userId, update, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        msg: enroll ? "Enrolled successfully" : "Unenrolled successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
