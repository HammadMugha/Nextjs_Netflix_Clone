import Account from "@/lib/Models/User";
import dbConnection from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnection
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const allAccounts = await Account.find();
    if (allAccounts) {
      return NextResponse.json({
        success: true,
        data: allAccounts,
      });
    } else {
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
