import React from 'react'
import { Link } from 'react-router-dom'
import { handleLogout } from '../helper/utils';

export const Navbar = () => {

    const jwt = localStorage.getItem('userdata');
    const isLoggedIn = jwt != null;

    return (
        <div>
            <header className="bg-white shadow">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-between py-4">
                        <div className="flex">
                            <Link to='/Home' className="text-lg font-semibold text-gray-900" >MyShop</Link>
                        </div>
                        <div className='hidden w-full md:block md:w-auto'>
                            <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0'>
                                {!isLoggedIn ? (
                                    <>
                                        <li className='block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500' aria-current="page"><Link to="/Home">Home</Link></li>
                                        <li className='block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500' aria-current="page"><Link to="/Contact">Contact</Link></li>
                                        <li className='block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500' aria-current="page"><Link to="/Login">Login</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li className='block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500' aria-current="page"><Link to="/Main">Home</Link></li>
                                        <li className='block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500' aria-current="page"><Link to="/Products">Products</Link></li>
                                        <li className='block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500' aria-current="page"><Link to="/Cart">Cart</Link></li>
                                        <li className='block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500' aria-current="page"><Link to="/Contact">Contact</Link></li>
                                        <li className='block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500' aria-current="page">
                                            <button onClick={handleLogout} >Logout</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    )
}
