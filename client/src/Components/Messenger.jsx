import React, { useState } from 'react'
import User_2 from "../assets/Users/Profile-Pic-S (1).png"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';


function Messenger() {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const arr = [1, 2, 3, 4, 5]
    const m = { text: 'hello how are you?', createdAt: new Date() }

    const handleHamClick = () => {
        document.getElementById('chat-list').classList.toggle('hidden')
    }
    return (
        <div className=' flex justify-center h-full'>
            <aside className="md:w-1/5 hidden md:block absolute sm:w-full md:static w-screen " id='chat-list'>
                <div className="overflow-y-auto pt-20 h-screen  px-3 bg-gray-50 rounded dark:bg-gray-900">
                    <ul className="">
                        <li className='border-b border-gray-200 dark:border-gray-700'>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                <span className="ml-3 font-semibold">Messages</span>
                            </a>
                        </li>
                        {arr.map((index) => (
                            <li key={index} className='mt-2'>
                                <div class="flex items-center " onClick={handleHamClick}>
                                    <div class="inline-block relative shrink-0">
                                        <img class="w-12 h-12 rounded-full" src={User_2} alt="Jese Leos image" />
                                        <span class="inline-flex absolute right-0 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full">
                                            <svg aria-hidden="true" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                            <span class="sr-only">Message icon</span>
                                        </span>
                                    </div>
                                    <div class="ml-3 text-sm font-normal">
                                        <div class="text-sm font-semibold text-white ">John Green</div>
                                        <div class="text-sm font-normal text-white">Hey how are you?</div>
                                        <span class="text-xs font-medium text-blue-600 dark:text-blue-500">1 min ago</span>
                                    </div>
                                    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">2</span>
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
            </aside>
            <div className='w-4/5 mt-20 mx-3 mb-3'>
                <div className=' rounded-lg p-2 flex flex-wrap content-end justify-between items-center bg-purple-900'>
                    <div className='flex gap-4 items-center'>
                        <div className=''>
                            <button onClick={handleHamClick} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 " aria-controls="navbar-search" aria-expanded="false">
                                <span className="sr-only">Open menu</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            </button></div>
                        <img class="w-12 h-12 rounded-full" src={User_2} alt="Jese Leos image" />
                        <div class="text-sm font-semibold text-white ">John Green</div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <div className='p-1 rounded-full bg-purple-400 text-white'><CallIcon /></div>
                        <div className='p-1 rounded-full bg-purple-400 text-white'><VideocamIcon /></div>
                        <div className='p-1 rounded-full bg-purple-400 text-white'><MoreVertOutlinedIcon /></div>
                    </div>
                </div>
                <div className='min-h-[90%] rounded-b-lg flex flex-col justify-end bg-white overflow-auto '>
                    <div className='overflow-y-scroll h-96' style={{ minHeight: '32rem' }}>
                        <Message message={m} own={false} />
                        {messages.map((mess, index) => (
                            <Message message={mess} own={true} />
                        ))}
                    </div>
                    <div className='flex gap-2 m-2 items-center'>
                        <textarea name="message" onChange={(e) => setMessage(e.target.value)} value={message} id="" placeholder='Send something...' rows='2' className='border border-solid border-gray-400 p-2 focus:outline-none rounded-2xl w-full' />

                        <span onClick={() => {
                            setMessages(() => {
                                if (message.length > 0) {
                                    return [...messages, { createdAt: new Date(), text: message }]
                                } else {
                                    return [...messages]
                                }
                            });
                            setMessage('');
                        }} className='rounded-lg p-4  text-white bg-purple-800'><SendIcon /></span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messenger;