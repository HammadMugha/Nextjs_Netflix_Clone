"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { BiSearch, BiBell } from "react-icons/bi";
export default function Search({ searchQuery, setSearchQuery }) {
  const router = useRouter()
  async function handleSearch(e){
    if(e.key == "Enter" && searchQuery.length){
      router.push(`/search/${searchQuery}`)
    }
  }

  return (
    <div className="px-3 py-2 w-[200px] md:w-full rounded flex items-center gap-3 bg-[#141414] border-[0.5px] border-[#e5e5e5]">
      <button>
        <BiSearch />
      </button>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleSearch}
        className="bg-transparent outline-none border-none text-white"
      />
    </div>
  );
}
