import Account from "@/lib/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnection from "@/lib/database";

export async function POST(req) {
  await dbConnection();
  try {
    const { pin, accountId, uid } = await req.json();

    const getAccount = await Account.findOne({ _id: accountId, uid });
    if (!getAccount) {
      return NextResponse.json({
        success: false,
        message: "Account not found",
      });
    }

   if(getAccount){
    const comparePin = await bcrypt.compare(pin, getAccount.pin);
    if (comparePin) {
      return NextResponse.json({
        success: true,
        message: "Login success Welcome to Netflix",
        data: getAccount
      });
    }
   }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
}
