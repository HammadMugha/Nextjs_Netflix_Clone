"use client";

import { getMovieDetailsById } from "@/lib/requests";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function WatchMovie() {
  const [movieDetail, setMovieDetail] = useState({});
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    async function getMovieDetail() {
        const getMovieDetail = await getMovieDetailsById(params.id)
        setMovieDetail(getMovieDetail[0])
    }
    getMovieDetail();
  }, [params]);
  return (
    <div className="h-screen w-full">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${movieDetail?.key}`}
        height={"100%"}
        width={"100%"}
        style={{ position: "absolute", top: "0", left: "0", zIndex: "9999" }}
        controls
        playing
      />
    </div>
  );
}
