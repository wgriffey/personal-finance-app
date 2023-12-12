import React from 'react'

function Login() {
  return (
    <div className='flex flex-col justify-center text-center items-center min-h-[100dvh]'>
        <h1 className=' text-white text-4xl font-mono'>Welcome to Personal Finance!</h1>
        <div className=' grid grid-cols-1 border-4 border-solid border-white rounded-lg bg-transparent w-[600px] h-[400px]'>
            <form>
                <input type="text" name="username" id="username" placeholder='Username' className='w-[80%] h-[10%] rounded-lg mt-3'></input>
            </form>
        </div>
    </div>
  )
}

export default Login