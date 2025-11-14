'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function verifyPage() {
    const [token, setToken] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    useEffect( () => {
        const urlToken = window.location.href.split("=")[1]
        setToken(urlToken)
    } )

    const verifyEmail = async() => {
        try {
            const response = await axios.post("/api/users/verify", {token})
            setError("")
            router.push("/login")
        } catch (error:any) {
            setError(error.message)
            throw new Error(error.message)
        }
    }

  return (
    <div className='h-screen w-screen flex flex-col gap-8 justify-center items-center' > 
        <div className='text-xl underline font-serif' >VERIFICATION</div>
        <button 
        className='bg-green-600 hover:bg-green-700 cursor-pointer text-lg py-1 px-4 rounded-xl'
        type="button"
        onClick={verifyEmail}
        >verify</button>
        <p>{error? error : "" }</p>
    </div>
  )
}

export default verifyPage