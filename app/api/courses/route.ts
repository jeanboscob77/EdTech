import { connectDB } from "@/lib/db";
import Course from "@/lib/models/courses";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const userId = searchParams.get("userId");

    if (id) {
      const course = await Course.findById(id);
      if (!course) {
        return NextResponse.json(
          { message: "Course not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(course);
    }

    if (userId) {
      const courses = await Course.find({
        userId: new mongoose.Types.ObjectId(userId),
      });
      if (!courses) {
        return NextResponse.json(
          { message: "You have not enrolled in any course!!!" },
          { status: 404 }
        );
      }
      return NextResponse.json(courses);
    }

    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { shortDescription: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const courses = await Course.find(filter);
    console.log(courses);
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      shortDescription,
      fullDescription,
      duration,
      prerequisites,
      instructor,
      isEnrolled,
      userId,
    } = body;

    if (
      !title ||
      !shortDescription ||
      !fullDescription ||
      !duration ||
      !prerequisites ||
      !instructor
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newCourse = new Course({
      title,
      shortDescription,
      fullDescription,
      duration,
      prerequisites,
      instructor,
      isEnrolled,
      userId,
    });

    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { isEnrolled, userId } = body;

    if (isEnrolled === undefined || !userId) {
      return NextResponse.json(
        { message: "Enroll and UserId are required" },
        { status: 400 }
      );
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { isEnrolled, userId },
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error in PATCH:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
