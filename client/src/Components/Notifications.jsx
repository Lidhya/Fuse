import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import User_2 from "../assets/Users/Profile-Pic-S (1).png"

function Notifications() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [notifications, setNotifications] = useState([])

//     const { isLoading, error, data } = useQuery(["notifications"], () =>
//   Axios.get(`/notificatoins/${currentUser._id}`)
//   .then(({data}) => {
//     const sortedData=data.sort(function(a,b){
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//       return sortedData;
//     }).catch((error)=> {
//       if (!error.response.data?.auth) return logout();
//       return error.data
//       console.log(error.data.message);
//     })

//   );

//     // Access the client
//   const queryClient = useQueryClient()

//   // Mutations
//   const mutation = useMutation(() => {
//     return Axios.put(`/post/like/${currentUser._id}`, { postId: _id }, config).then((response) => {
//       console.log(response);
//       profileUpdate && profileUpdate()
//     }).catch((error) => {
//       console.log(error.message);
//     })
//   },
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries({ queryKey: ['posts'] })
//       },
//     })

    return (
        <div className=' md:px-14  my-3 w-96 md:w-full'>
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