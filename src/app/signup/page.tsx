'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, {Toaster} from 'react-hot-toast'

const notify = () => toast.success('registering user...',{
    position: "top-right",
    style: {
        border: '1px solid #713200',
    },
});

function signupPage() {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)

    const router = useRouter()

    useEffect( ()=> {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    }, [user] )

    const handleChange = async(e:any) => {
        e.preventDefault()
        notify()
        setLoading(true)
        console.log("user::", user);
        
        const response = await axios.post("/api/users/signup", user )
        console.log(response);
        
        router.push('/login')
    }

  return (
    <div className='h-screen w-screen flex flex-col justify-between items-center pt-52 pb-10' >
        <Toaster/>
        <div>
            <h3 className='text-center pb-6' >{loading? "Processing" : "Please Signup!" }</h3>
            <form 
            onSubmit={(e)=> handleChange(e)}
            action="submit"
            className='flex justify-center items-center flex-col '
            >
                <input type="email" 
                name="email" 
                value={user.email}
                onChange={(e)=> setUser({...user, email:e.target.value}) }
                placeholder='Enter your email'
                className='mb-4 bg-white text-black/90 px-4 py-2 rounded-2xl text-sm w-md'
                ></input>

                <input 
                type="username" 
                name="username" 
                value={user.username}
                onChange={(e)=> setUser({...user, username:e.target.value}) }
                placeholder='Enter your username'
                className='mb-4 bg-white text-black/90 px-4 py-2 rounded-2xl text-sm w-md'
                ></input>

                <input 
                type="password" 
                name="password"  
                value={user.password}
                onChange={(e)=> setUser({...user, password:e.target.value}) }
                placeholder='Enter your password'
                className='bg-white text-black/90 px-4 py-2 rounded-2xl text-sm w-md'
                ></input>

                <div className='flex justify-end w-full' >
                    <button 
                    disabled={buttonDisable}
                    type="submit"
                    className='px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-xl mt-8 cursor-pointer '
                    >{buttonDisable? "fill credentials" : "signup"}</button>
                </div>
            </form>
        </div>
        <div className='flex justify-center mt-10' >
            <p>Don't have account? Please <Link href={"/login"} className='text-blue-500' >login</Link></p>
        </div>
    </div>
    
  )
}

export default signupPage