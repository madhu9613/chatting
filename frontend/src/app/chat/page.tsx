"use client";

import Loading from '@/components/Loading';
import { useAppData } from '@/context/AppContext';
import { redirect } from 'next/dist/client/components/navigation';
import router from 'next/dist/shared/lib/router/router';
import React, { useEffect } from 'react'

const page = () => {
    const {loading,isAuth}=useAppData();

    useEffect(()=>{
        if(!isAuth && !loading){
            redirect("/login");
        }   
    },[isAuth,router,loading])

    if(loading){
        return <Loading/>
    }

  return (
    <div>ChatApp</div>
  )
}

export default page