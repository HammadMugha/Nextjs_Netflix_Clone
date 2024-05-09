import Account from "@/lib/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function DELETE(req) {
  try {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')

    const deleteAccount = await Account.findByIdAndDelete(id)

    if(deleteAccount){
        return NextResponse.json({
            success: true,
            message: "Account deleted successfully",
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