"use client";
import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext } from "react";

export default function AccountPopup() {
  const { setLoginAccount } = useContext(GlobalContext);
  return (
    <div className="bg-[#141414] p-4 flex flex-col space-y-2 rounded-lg cursor-pointer absolute top-[60px] right-8">
      <span
        className="text-sm text-[#e5e5e5] cursor-pointer"
        onClick={() => setLoginAccount(null)}
      >
        Sign Out
      </span>
    </div>
  );
}
