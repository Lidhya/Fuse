purple-700= #7e22ce

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJexeHZwbEI9rxhA28V-41vui8EhUSjbw",
  authDomain: "fuse-f6183.firebaseapp.com",
  projectId: "fuse-f6183",
  storageBucket: "fuse-f6183.appspot.com",
  messagingSenderId: "771144086111",
  appId: "1:771144086111:web:3abf73941f1b6b2028e1ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

message funtional component
// function Message({ message, own, user}) {
//     const { currentUser} = useContext(UserContext)
//     const {sender, text, createdAt}=message

//   return (
//     <div className={own ? "flex flex-col mt-5 items-end m-3" : "flex flex-col mt-5 m-3"}>
//     <div className="flex">
//       <img
//         className="h-8 w-8 rounded-full object-cover mr-2.5"
//         src={own? (currentUser.profilePicture? currentUser.profilePicture : blank_profile) : (user?.profilePicture? user.profilePicture : blank_profile)}
//         alt="user"
//       />
//       <p className={own? "p-2.5 rounded-2xl bg-gray-300 text-black max-w-xs": "p-2.5 rounded-2xl bg-purple-700 text-white max-w-xs"}>{text}</p>
//     </div>
//     <div className="text-xs mt-2.5">{moment(createdAt).fromNow()}</div>
//   </div>
//   )
// }