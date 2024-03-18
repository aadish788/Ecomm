import React, { useState } from 'react';
import image from '../images/1.jpg';
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setError] = useState('');
    const createcart = async (username) => {
        try {
            const response = await fetch(`http://localhost:2000/cart/createCart/${username}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json(); 
                console.log("first")
                console.log('Response:', response);
                console.log('Data:', data); 
                const { cartId } = data;
                console.log('Cart ID:', cartId);
                sessionStorage.setItem('cartId', cartId);
            } else {
                console.error('Error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createcart(username);
            const response = await fetch('http://localhost:2000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.status === 200) {
                const resp = await response.json();
                const mytoken = resp?.token;
                localStorage.setItem('userdata', JSON.stringify(mytoken));
                createcart(username); 
                window.location.href = './Main';
            } else if (response.status === 400) {
                alert("Username or password is wrong");
            }
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2'>
            <div className='hidden sm:block'>
                <img className='w-full h-screen object-cover p-2' src={image} alt='' />
            </div>
            <div className='bg-gray-100 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 rounded-lg' onSubmit={handleSubmit}>
                    <h2 className='text-4xl dark:text-gray-800 font-bold text-center'>SIGN IN</h2>
                    <div className='flex flex-col text-gray-800 py-2'>
                        <label>Username</label>
                        <input className='rounded-lg bg-gray-100 focus:border-blue-500' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex flex-col text-gray-800 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-100 focus:border-blue-500' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='flex justify-between text-gray-800 py-2'>
                        <p className='flex items-center text-blue-800 '><Link to="/Signup">Create an account</Link></p>
                        <p>Forgot Password</p>
                    </div>
                    <button className='w-full my-5 py-2 bg-teal-500 text-white font-semibold rounded-lg' type='submit' >Sign in</button>
                </form>
            </div>
        </div>
    );
}
