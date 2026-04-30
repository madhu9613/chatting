
"use client"

import React,{useState} from 'react'
import { ArrowRight, Loader2, Mail } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { promises } from 'dns'
import axios from 'axios'
import { useAppData, user_service } from '@/context/AppContext'
import Loading from '@/components/Loading'
import { toast } from 'react-hot-toast'
const LoginPage = () => {

    const [email,setEmail]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(false)
    const router=useRouter();
    const {isAuth,loading:userLoading}=useAppData();

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        setLoading(true);
        try {
            const {data}=await axios.post(`${user_service}/login`,{email})
            
            toast.success(data.message);
            router.push(`/verify?email=${email}`)
        } catch (error:any) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    if(userLoading){
        return <Loading/>
    }

    if(isAuth){
       return redirect("/chat");
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">

            <div className='max-w-md w-full'>
                <div className='bg-gray-800 border border-gray-700 rounded-lg p-8'>
                    <div className='text-center mb-8'>
                        <div className='mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-6'>
                             
                             <Mail size={40} className='text-white'></Mail>

                        </div>
                        <h1 className='text-4xl font-bold text-white mb-3'>
                              Welcome To ChatApp
                        </h1>

                        <p className='text-gray-300 text-lg'>
                            Enter Your Email To Continue your Journey
                        </p>

                    </div>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-2'>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className='bg-gray-700 border w-full border-gray-600 placeholder:text-gray-400 text-white focus:outline-none
                                 focus:ring-2 focus:ring-blue-500 h-15 rounded-lg px-3'
                                placeholder='you@example.com'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5" />
                                    Sending Otp to your mail...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span>Send Verification Code</span>
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            )}
                        </button>

                    

                    </form>


                </div>

            </div>
        </div>
    )
}

export default LoginPage