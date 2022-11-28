import React, { useState } from 'react'
import User_2 from "../assets/Users/Profile-Pic-S (1).png"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import Conversation from './Conversations';

function Messenger() {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const m = { text: 'hello how are you?', createdAt: new Date() }

    const handleHamClick = () => {
        document.getElementById('chat-list').classList.toggle('hidden')
    }
    return (
        <div className=' flex justify-center h-full'>
            <aside className="md:w-1/5 hidden md:block absolute sm:w-full md:static w-screen " id='chat-list'>
                <Conversation toggle={handleHamClick}/>
            </aside>
            <div className='w-4/5 mt-20 mx-3 mb-3'>
                <div className=' rounded-lg p-2 flex flex-wrap content-end justify-between items-center bg-purple-900'>
                    <div className='flex gap-4 items-center'>
                        <div className=''>
                            <button onClick={handleHamClick} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 " aria-controls="navbar-search" aria-expanded="false">
                                <span className="sr-only">Open menu</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            </button></div>
                        <img className="w-12 h-12 rounded-full" src={User_2} alt="Jese Leos image" />
                        <div className="text-sm font-semibold text-white ">John Green</div>
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