"use client"
import Browse from "@/components/Browse/Browse";
import Button from "@/components/Button/Button";
import Logo from "@/components/Custom/Logo";
import { signIn, useSession } from "next-auth/react";
import React from "react";

export default function Login() {
  const {data:session} = useSession()
  // if(session === "authenticated") return <Browse />
  return (
    <div className="h-screen flex items-center">
      <div className="absolute inset-0 -z-10 bg-[url(/background_banner.jpg)] bg-blend-soft-light w-full h-screen bg-black/60"></div>
      {/* logo */}
      <Logo style={"absolute top-8 left-[30px] w-[150px]"} />
      {/* form box */}
      <div className="w-full rounded max-w-[400px] p-[40px] bg-black/80 mx-auto">
        <h2 className="text-white text-2xl font-semibold mb-4">Sign In</h2>
        <input
          type="text"
          placeholder="name"
          className="py-3 px-2 rounded bg-[#374151] w-full mb-3"
        />
        <input
          type="text"
          placeholder="name"
          className="py-3 px-2 rounded bg-[#374151] w-full mb-3"
        />
        <input
          type="text"
          placeholder="name"
          className="py-3 px-2 rounded bg-[#374151] w-full mb-3"
        />
        <Button
          text={"signin"}
          style={"text-white bg-[#DC2626] w-full !py-2 hover:bg-red-700"}
        />
        <Button
          text={"Github"}
          onClick={()=> signIn('github')}
          style={"text-white bg-gray-800 rounded-md mt-2 w-full !py-2 hover:bg-gray-900"}
        />
      </div>
    </div>
  );
}
