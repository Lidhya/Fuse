import React from 'react'
import { Link } from 'react-router-dom'


function Signup() {
    return (
        <>
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className=" flex justify-center absolute overflow-y-auto overflow-x-hidden  z-50 w-full md:inset-0  md:h-full">
                <div className=" relative w-full max-w-md h-full md:h-auto bg-black lg:-mr-96 ">

                    <div className=" h-screen flex justify-center items-center  bg-black  dark:bg-black">
                        <div className=" py-6 px-6 lg:px-8 flex-1">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign up to <span className='text-blue-800 font-bold text-2xl'>FUSE</span></h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                                    <input type="text" name="fname" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John" required />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                                    <input type="text" name="lname" id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Doe" required />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="johndoe@gmail.com" required />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="john_doe" required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Already registered? <Link to={'/signin'} className="text-blue-700 hover:underline dark:text-blue-500">Sign in to your account</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup