import { connectDB } from "@/lib/db";
import Contacts from "@/lib/models/Contacts";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await connectDB();

  const body = await req.json();
  const { names, email, subject, message } = body;

  try {
    if (!names || !email || !subject || !message)
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    const contacts = new Contacts({ names, email, subject, message });
    await contacts.save();
    return NextResponse.json(contacts, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error.mesage, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  await connectDB();

  const contacts = await Contacts.find();

  try {
    if (contacts.length === 0)
      return NextResponse.json({ msg: "no contacts founds" }, { status: 404 });
    return NextResponse.json(contacts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.mesage, { status: 500 });
  }
};
