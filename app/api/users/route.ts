import { connectDB } from "@/lib/db";
import Users from "@/lib/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const GET = async(req: Request)=>{
  try {
    await connectDB()

    const user = await Users.find()
    if(!user) return NextResponse.json({msg: "user not found"},{status: 404})
        return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({error: error.message},{status: 500})
  }
}



export const POST = async(req: Request)=>{
  try {
    await connectDB()
   const body = await req.json()
   const {firstname, lastname, dateOfBirth, email, password} = body
   const isEmailExist: any = await Users.findOne({email})

   if(isEmailExist) return NextResponse.json({msg: 'User Already Exist !!!'},{status: 400})

   const hashed = await bcrypt.hash(password,10)
   if(!firstname || !lastname || !dateOfBirth || !email || !password)
     return NextResponse.json({msg: "All fields required"},{status: 400})
    const newUser = new Users({firstname,lastname,dateOfBirth,email,password: hashed})
    await newUser.save()
    return NextResponse.json({newUser},{status: 201})
  } catch (error: any) {
    return NextResponse.json({error: error.message},{status: 500})
  }
}