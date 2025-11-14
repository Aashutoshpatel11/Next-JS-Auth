'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast,{ Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const notify = (data:string) => toast.success(data || "logging in...",{
    position: "top-right",
    style: {
        border: '1px solid #713200',
    },
})

function loginPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisable, setButtonDisable] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect( ()=>{
        if( user.email.length >0 && user.password.length>0 ){
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    }, [user] )

    const handleClick = async() => {
        notify("logging in...")
        setLoading(true)
        console.log(user)
        const response = await axios.post('/api/users/login',user)
        console.log(response);
        setLoading(false)
        notify(response?.data?.error || response?.data?.message)
        router.push("/profile")

    }

  return (
    <div className='h-screen w-screen flex flex-col justify-between items-center pt-52 pb-10' >
        <Toaster/>
        <div>
            <h3 className='text-center pb-6' >{loading? "logging in":"Please Login!"}</h3>
            <div className='flex justify-center items-center flex-col '>
                <input 
                type="email" 
                name="email"
                value={user.email}
                onChange={(e) => setUser({...user, email:e.target.value}) } 
                placeholder='Enter your email'
                className='mb-4 bg-white text-black/50 px-4 py-2 rounded-2xl text-sm w-md'
                ></input>
                <input 
                type="password" 
                name="password" 
                value={user.password}
                onChange={(e) => setUser({...user, password:e.target.value})}
                placeholder='Enter your password'
                className='bg-white text-black/50 px-4 py-2 rounded-2xl text-sm w-md'
                ></input>
                <button 
                disabled={buttonDisable}
                type="button"
                onClick={handleClick}
                className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl mt-4 cursor-pointer '
                >Login</button>
            </div>
        </div>
        <div className='flex justify-center mt-10' >
            <p>Don't have account? Please <Link href={"/signup"} className='text-blue-500' >Sign up</Link></p>
        </div>
    </div>
  )
}

export default loginPage