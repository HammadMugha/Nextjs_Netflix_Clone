"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import Login from '../login/page';

export default function Movies() {
    const {data: session} = useSession()
    if(session === null) return <Login />
    console.log("session",session);
  return (
    <div>page</div>
  )
}
