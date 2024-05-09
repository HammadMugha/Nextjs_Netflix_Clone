"use client";

import requests from "@/lib/requests";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlay, FaInfo } from "react-icons/fa";

export default function HeroBanner() {
  const router = useRouter()
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    axios.get(requests.requestPopular).then((res) => {
      setMovies(res.data.results);
      console.log(res.data.results);
    });
  }, []);
  return (
    <div className="w-full h-[600px] text-white relative">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[24%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            {movie?.title}
          </h1>
          <p className="w-full md:max-w-[70%] lg:max-w-[70%] xl:max-w-[50%] text-gray-200">
            {movie?.overview.slice(0,200)+"..."}
          </p>
          <div className="my-4 flex">
            <button onClick={()=> router.push(`/movies/${movie.id}`)} className="border flex items-center gap-2 bg-white transition-all duration-300 hover:opacity-75 text-black border-white rounded-[.3rem] py-2 px-5">
              <FaPlay /> Play
            </button>
            <button className="bg flex items-center gap-2 transition-all duration-300 hover:opacity-75 text-white rounded-[.3rem] py-2 px-5 ml-4">
              <FaInfo /> Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
        </div>
      </div>
    </div>
  );
}
