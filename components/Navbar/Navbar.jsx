"use client";
import React, { useContext, useEffect, useState } from "react";
import Container from "../Custom/Container";
import Link from "next/link";
import Logo from "../Custom/Logo";
import { navLinks } from "@/constants/data";
import { BiSearch, BiBell,BiChevronDown } from "react-icons/bi";
import Image from "next/image";
import { GlobalContext } from "@/context/GlobalContext";
import Search from "@/components/Navbar/Search";
import AccountPopup from "./AccountPopup";

export default function Navbar() {
  const { loginAccount } = useContext(GlobalContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled ? "bg-[#141414]" : ""}`}>
      <Container>
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href={"/"}>
              <Logo style={"h-auto w-[100px]"} />
            </Link>
            <ul className="hidden md:flex space-x-3">
              {navLinks.map((link, i) => (
                <Link
                  href={link.path}
                  className="cursor-pointer text-sm font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
                  key={i}
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            {/* search query component */}
            {showSearch ? (
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            ) : (
              <BiSearch
                className="h-6 w-6 cursor-pointer"
                onClick={() => setShowSearch(!showSearch)}
              />
            )}
            <p className="hidden md:flex">Kids</p>
            <BiBell className="hidden md:inline h-6 w-6" />
            <div
              className="flex items-center space-x-2 relative cursor-pointer"
              onClick={() => setShowAccount(!showAccount)}
            >
              <Image
                src={"/dp.png"}
                alt="img"
                width={50}
                height={50}
                className="cursor-pointer rounded w-auto h-auto"
              />
              <div className="flex items-center ">
              <span>{loginAccount?.name}</span>
              <span>
                <BiChevronDown />
              </span>
              </div>
            </div>
          </div>
        </nav>
      </Container>
      {/* show account popup */}
      {showAccount && <AccountPopup />}
    </header>
  );
}
