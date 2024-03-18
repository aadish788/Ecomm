import React, { useState } from 'react'
import image from '../images/1.jpg'

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:2000/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ name, username, email, password })

            }).then(window.location.href = './Login').then(alert("User created Sucessfully"))
        } catch (error) {
            console.log('errors=', error)
            // Handle error
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2'>
            <div className='hidden sm:block'>
                <img className='w-full h-screen p-2 object-cover' src={image} alt='' />
            </div>
            <div className='bg-gray-100 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 rounded-lg' onSubmit={handleSubmit} >
                    <h2 className='text-4xl dark:text-blue-500 font-bold text-center'>Sign Up</h2>
                    <div className='flex flex-col text-gray-800 py-2'>
                        <label>Name</label>
                        <input className='rounded-lg bg-gray-100 focus:border-blue-500' type='text' value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className='flex flex-col text-gray-800 py-2'>
                        <label>Username</label>
                        <input className='rounded-lg bg-gray-100 focus:border-blue-500' type='text' value={username} onChange={(e) => setusername(e.target.value)} />
                    </div>
                    <div className='flex flex-col text-gray-800 py-2'>
                        <label>Email</label>
                        <input className='rounded-lg bg-gray-100 focus:border-blue-500' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col text-gray-800 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-100 focus:border-blue-500' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='w-full my-5 py-2 bg-teal-500 text-white font-semibold rounded-lg' type='submit'>Sign Up </button>
                </form>
            </div>
        </div>
    )
}

