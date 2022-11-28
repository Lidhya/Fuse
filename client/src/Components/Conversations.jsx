import React from 'react'
import blank_profile from "../assets/empty profile/blank_profile.png"


function Conversations({toggle}) {
    const arr = [1, 2, 3, 4, 5]

  return (
    <>
    <div className="overflow-y-auto pt-20 h-screen  px-3 bg-gray-50 rounded dark:bg-gray-900">
                    <ul className="">
                        <li className='border-b border-gray-200 dark:border-gray-700'>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                <span className="ml-3 font-semibold">Messages</span>
                            </a>
                        </li>
                        {arr.map((index) => (
                            <li key={index} className='mt-2'>
                                <div className="flex items-center " onClick={()=>toggle()}>
                                    <div className="inline-block relative shrink-0">
                                        <img className="w-12 h-12 rounded-full" src={blank_profile} alt="Jese Leos image" />
                                        <span className="inline-flex absolute right-0 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full">
                                            <svg aria-hidden="true" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Message icon</span>
                                        </span>
                                    </div>
                                    <div className="ml-3 text-sm font-normal">
                                        <div className="text-sm font-semibold text-white ">John Green</div>
                                        <div className="text-sm font-normal text-white">Hey how are you?</div>
                                        <span className="text-xs font-medium text-blue-600 dark:text-blue-500">1 min ago</span>
                                    </div>
                                    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">2</span>
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
    </>
  )
}

export default Conversations