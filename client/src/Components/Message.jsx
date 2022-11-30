import React, { useContext, Component } from 'react'
import moment from 'moment';
import blank_profile from "../assets/empty profile/blank_profile.png"
import { UserContext } from '../context/UserContext';

// class Message extends React.Component {

//   render() {
//     return <div className={this.props.own ? "flex flex-col mt-5 items-end m-3" : "flex flex-col mt-5 m-3"}>
//     <div className="flex">
//       <img
//         className="h-8 w-8 rounded-full object-cover mr-2.5"
//         src={this.props.own? (this.props.currentUser.profilePicture? this.props.currentUser.profilePicture : blank_profile) : (this.props.user?.profilePicture? this.props.user.profilePicture : blank_profile)}
//         alt="user"
//       />
//       <p className={this.props.own? "p-2.5 rounded-2xl bg-gray-300 text-black max-w-xs": "p-2.5 rounded-2xl bg-purple-700 text-white max-w-xs"}>{this.props.message.text}</p>
//     </div>
//     <div className="text-xs mt-2.5">{moment(this.props.message.createdAt).fromNow()}</div>
//   </div>
//   }
// }

function Message({ message, own, user}) {
    const { currentUser} = useContext(UserContext)
    const {sender, text, createdAt}=message

  return (
    <div className={own ? "flex flex-col mt-5 items-end m-3" : "flex flex-col mt-5 m-3"}>
    <div className="flex">
      <img
        className="h-8 w-8 rounded-full object-cover mr-2.5"
        src={own? (currentUser.profilePicture? currentUser.profilePicture : blank_profile) : (user?.profilePicture? user.profilePicture : blank_profile)}
        alt="user"
      />
      <p className={own? "p-2.5 rounded-2xl bg-gray-300 text-black max-w-xs": "p-2.5 rounded-2xl bg-purple-700 text-white max-w-xs"}>{text}</p>
    </div>
    <div className="text-xs mt-2.5">{moment(createdAt).fromNow()}</div>
  </div>
  )
}

export default Message