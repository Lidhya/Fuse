import React from 'react'
import User_2 from "../assets/Users/Profile-Pic-S (1).png"

function Notifications() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div className='px-14  my-3'>
            <h1 className='text-2xl  text-purple-700 font-thin mb-3'>Notifications</h1>
            {arr.map((index) => (
                <div key={index} className="w-full h-full bg-white my-3 rounded-xl shadow-md border-gray-100  border-2">
                    <div className=" flex flex-wrap justify-between items-center p-2.5">
                        <div className="flex items-center">
                            <img className="w-12 h-12 rounded-full object-cover mr-2.5" src={User_2} alt="" />
                            <p>Hellen liked your post.</p>
                        </div>
                        <span className='text-xs '>1 hour ago</span>

                    </div>
                </div>
            ))}

        </div>

    )
}

export default Notifications