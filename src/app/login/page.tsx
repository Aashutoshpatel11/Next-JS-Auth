import React from 'react'
import Link from 'next/link'

function loginPage() {
  return (
    <div className='h-screen w-screen flex flex-col justify-between items-center pt-52 pb-10' >
        <div>
            <h3 className='text-center pb-6' >Please Login!</h3>
            <form 
            action="submit"
            className='flex justify-center items-center flex-col '
            >
                <input 
                type="email" 
                name="email" 
                placeholder='Enter your email'
                className='mb-4 bg-white text-black/50 px-4 py-2 rounded-2xl text-sm w-md'
                ></input>
                <input 
                type="password" 
                name="password" 
                placeholder='Enter your password'
                className='bg-white text-black/50 px-4 py-2 rounded-2xl text-sm w-md'
                ></input>
                <button 
                type="submit"
                className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl mt-4 cursor-pointer '
                >Login</button>
            </form>
        </div>
        <div className='flex justify-center mt-10' >
            <p>Don't have account? Please <Link href={"/signup"} className='text-blue-500' >Sign UP</Link></p>
        </div>
    </div>
  )
}

export default loginPage