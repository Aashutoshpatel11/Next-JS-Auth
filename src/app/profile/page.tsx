'use client'
import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

function profilePage() {
    const[user, setUser] = useState({})
    const router = useRouter()

    const logout = async() => {
        try {
            const response = await axios.post('/api/users/logout')
            toast("logged Out",{position: "top-right"})
            router.push('/login')
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    const fetchUser = async() => {
        try {
            const response = await axios.get('/api/users/me')
            console.log("response:: :: :: ", response);
            setUser(response.data.data)
            toast.success("User data fetched successfully", {position: "top-right"})
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

  return (
    <div 
    className='h-screen p-10 w-screen flex flex-col justify-center items-center'
    >
        <Toaster/>
        <h2>PROFILE</h2>
        <p className='mt-4' >email: <Link href={`/profile/${user.email}`} >{user? user.email : "Fetching" }</Link></p>
        <button type="button"
        onClick={fetchUser} 
        className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl mt-4 cursor-pointer'
        >get details</button>
        <button type="button"
        onClick={logout} 
        className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl mt-4 cursor-pointer'
        >log out</button>
    </div>
  )
}

export default profilePage