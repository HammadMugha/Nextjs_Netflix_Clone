"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
export default function MovieList({ title, url, id }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      setMovies(res.data.results);
    });
  }, [url]);
  const rowId = useRef(null);

  //scroll functionality
  const handleScroll = (direction) => {
    if (rowId.current) {
      const { scrollLeft, clientWidth } = rowId.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowId.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-2xl mb-4 text-white font-bold cursor-pointer md:text-[3xl]">
        {title}
      </h2>
      <div className="relative w-full flex h-full items-center group">
        <BiChevronLeft
          onClick={() => handleScroll("left")}
          className="bg-white left-0 text-black rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <BiChevronRight
          onClick={() => handleScroll("right")}
          className="bg-white right-0 text-black  rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slide"}
          ref={rowId}
          className="w-full flex h-full overflow-x-scroll scroll-smooth space-x-2.5 scrollbar-hide"
        >
          {movies &&
            movies.length &&
            movies.map((item, i) => <MovieCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  );
}
