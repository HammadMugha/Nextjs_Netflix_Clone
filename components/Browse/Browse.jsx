"use client";
import Login from "@/app/login/page";
import HeroBanner from "@/components/Hero/HeroBanner";
import MovieList from "@/components/MovieList/MovieList";
import Navbar from "@/components/Navbar/Navbar";
import { GlobalContext } from "@/context/GlobalContext";
import requests from "@/lib/requests";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";
import ManageAccounts from "../manage-accounts";

export default function Browse() {
  const { loginAccount } = useContext(GlobalContext);
  const { data: session } = useSession();
  if (session === null) return <Login />;
  console.log("session", session);
  if (loginAccount === null) return <ManageAccounts />;
  return (
    <div>
      {/* Header */}
      <Navbar />
      {/* Main */}
      <HeroBanner />
      {/* Rows */}
      <div className="flex flex-col space-y-3">
        <MovieList title={"Upcoming"} url={requests.requestTopRated} id={"1"} />
        <MovieList title={"Trending"} url={requests.requestTrending} id={"2"} />
        <MovieList title={"Popular"} url={requests.requestPopular} id={"3"} />
        <MovieList title={"Upcoming"} url={requests.requestUpcoming} id={"4"} />
        <MovieList title={"Horror"} url={requests.requestHorror} id={"4"} />
      </div>
    </div>
  );
}
