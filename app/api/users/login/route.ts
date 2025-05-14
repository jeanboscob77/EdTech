import { connectDB } from "@/lib/db";
import Users from "@/lib/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken"



interface IUser {
  _id: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  dateOfBirth?: string;
}

const secret : any = process.env.JWT_SECRET

export const POST = async(req: Request)=>{
    try {
        await connectDB()
        const body = await req.json()
        const {email, password} = body
        const user: IUser | any = await Users.findOne({email})
        const isPassMatched = await bcrypt.compare(password,user.password)
        if(!user || !isPassMatched) return NextResponse.json({msg: "invalid credentials"},{status: 400})
            const token = jwt.sign({id: user._id,name: user.firstname},secret,{expiresIn: '1h'})
         return NextResponse.json({token})
    } catch (error:any) {
        return NextResponse.json(error.message)
    }
}