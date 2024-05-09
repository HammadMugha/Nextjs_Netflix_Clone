"use client"
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect } from 'react'
import Login from '../../login/page';
import { useParams } from 'next/navigation';
import { getTVorMovieSearchResults } from '@/lib/requests';
import { GlobalContext } from '@/context/GlobalContext';
import MovieCard from '@/components/MovieList/MovieCard';
import Navbar from '@/components/Navbar/Navbar';

export default function SearchPage() {
  const {searchResults, setSearchResults} = useContext(GlobalContext)
    const {data: session} = useSession()
    if(session === null) return <Login />
    console.log("session",session);

    const params = useParams();
    console.log(params);
    useEffect(()=>{
      async function getSearchResults(){
        const getSearchData = await getTVorMovieSearchResults(params.query)
        setSearchResults(getSearchData)
        console.log(searchResults);
      }
      getSearchResults()

    },[params])

  return (
    <>
    <Navbar />
    <div className='pt-[120px] px-4'>
      <h2 className='text-2xl text-white font-semibold mb-8'>Show the Results of {params.query}</h2>
      <div className="grid md:grid-cols-5 gap-3 items-center">
        {searchResults && searchResults.map((item,i)=>(
          <MovieCard item={item} key={i}/>
        ))}
      </div>
    </div>
    </>
  )
}