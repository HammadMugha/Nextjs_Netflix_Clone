import Account from "@/lib/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import dbConnection from "@/lib/database";

export async function POST(req) {
  await dbConnection()
  try {
    const {name,pin,uid} = await req.json();

    const alreadyAccount = await Account.find({uid,name})
    if(alreadyAccount && alreadyAccount.length > 0) {
        return NextResponse.json({
            success: false,
            message: "please try with different name",
          });
    }

    const hashPin = await bcrypt.hash(pin,12)
    
    const newAccount = await Account.create({
        name,
        pin: hashPin,
        uid: uid
    })

    if(newAccount){
        return NextResponse.json({
            success: false,
            message: "Account created successfully",
          });
    }else{
        return NextResponse.json({
            success: false,
            message: "something went wrong",
          });
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
}
