"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function MovieCard({item}) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
    <div className='relative cardWrapper group h-36 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110'>
        <Image 
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path || item?.poster_path}`}
        alt="media img"
        className='rounded opacity-100'
        objectFit='cover'
        onClick={()=> router.push(`/movies/${item?.id}`)}
        fill
        />
    </div>
    </motion.div>
  )
}
