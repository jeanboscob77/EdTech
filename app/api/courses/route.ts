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

      // Check if user is enrolled in this course
      let isEnrolled = false;
      if (userId && course.enrolledUserIds?.length > 0) {
        isEnrolled = course.enrolledUserIds.some(
          (uid: mongoose.Types.ObjectId) => uid.toString() === userId
        );
      }

      return NextResponse.json({
        ...course.toObject(), // Convert course to plain object
        isEnrolled, // Add the enrollment status
      });
    }

    if (userId) {
      const courses = await Course.find({
        enrolledUserIds: new mongoose.Types.ObjectId(userId),
      });
      if (!courses) {
        return NextResponse.json(
          { message: "You have not enrolled in any course!" },
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
