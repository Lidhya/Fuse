import React from 'react'

function Message({ message, own }) {
    const {text, createdAt}=message
  return (
    <div className={own ? "flex flex-col mt-5 items-end m-3" : "flex flex-col mt-5 m-3"}>
    <div className="flex">
      <img
        className="h-8 w-8 rounded-full object-cover mr-2.5"
        src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <p className={own? "p-2.5 rounded-2xl bg-gray-400 text-black max-w-xs": "p-2.5 rounded-2xl bg-purple-700 text-white max-w-xs"}>{text}</p>
    </div>
    <div className="text-xs mt-2.5">{createdAt.toDateString()}</div>
  </div>
  )
}

export default Message