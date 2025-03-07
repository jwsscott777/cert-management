"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import {useRouter} from "next/navigation";
import {useAuth} from "@clerk/nextjs";
export const dynamic = "force-dynamic";
const api_url = process.env.NEXT_PUBLIC_API_URL;

// function EditTask({task}) {
//     const [title, setTitle] = useState(task?.title || "");
//     const [description, setDesc] = useState(task?.description || "");
//     const [status, setStatus] = useState(task?.status || false);
//     const router = useRouter();
    
//     const {userId, getToken} = useAuth();

//     const handleEditTask = async(e) =>{
//         e.preventDefault();
//         try{
//             if(!userId){
//                 alert("You are not logged in!")
//                 return; 
//             }
//             const token = await getToken();

//             if(!token){
//                 alert("Please log in again.")
//                 return; 
//             }
           
//             const response = await fetch(`${api_url}/${task._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({title, description, status}),
//             });

//             if (!response.ok){
//                 throw new Error(`Failed to update this task, ${response.status}`);
//             }
//             const updatedTask = await response.json();
//             //console.log("Updated task", updatedTask);
//             router.push("/todos");
//         }catch (error) {
//             alert(`Failed to edit task, ${error.message}`)
//         }
//     }

//   return (
//       <>
//           <div className='w-full flex flex-col justify-center items-center'>
//               <form onSubmit={handleEditTask}
//                     className='flex flex-col w-4/5 my-3 py-12 px-6 rounded-sm shadow-gray-400 shadow-lg space-y-9'>
//                   <div className="w-full flex flex-col space-y-4 justify-center items-start">
//                       <label htmlFor="title" className='font-bold'>Program Title</label>
//                       <input type="text" name="title" placeholder='Program Title' value={title} onChange={(e) => {setTitle(e.target.value)}} className='outline outline-gray-800 text-amber-900 rounded-sm px-1 h-8 w-full'/>
//                   </div>
//                   <div className="w-full flex flex-col space-y-4 justify-center items-start">
//                       <label htmlFor="description" className='font-bold'>Student Description</label>
//                       <textarea rows="6" name="description" placeholder='Student Description' value={description} onChange={(e) => {setDesc(e.target.value)}} className='outline outline-gray-800 text-amber-900 rounded-sm px-1 h-8 w-full'/>
//                   </div>
//                   <div className="w-full flex flex-col space-y-4 justify-center items-start">
//                       <label htmlFor="title" className='font-bold text-blue-700'>Date Created</label>
//                       <span className="font-semibold text-xs text-amber-700">{task?.time || "N/A"}</span>
//                   </div>
//                   <div className="w-full flex flex-col space-y-4 justify-center items-start">
//                       <label htmlFor="title" className='font-bold text-green-400'>Status</label>
//                       <select className='outline outline-gray-800 text-blue-800 rounded-sm px-1 h-8 w-full'
//                               name="status"
//                               value={status}
//                               onChange={(e) => {setStatus(e.target.value == 'true')}}>
//                           <option value="true">Signed</option>
//                           <option value="false">Not Signed</option>
//                       </select>
//                   </div>
//                   <button type="submit"
//                           className='bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded'>Submit
//                   </button>
//               </form>
//           </div>
//       </>
//   )
// }

// export default EditTask 

function EditTask({ task }) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDesc] = useState(task?.description || "");
    const [status, setStatus] = useState(task?.status || false);
    const router = useRouter();
    const { userId, getToken } = useAuth();
  
    const handleEditTask = async (e) => {
      e.preventDefault();
      try {
        if (!userId) {
          alert("You are not logged in!");
          return;
        }
        const token = await getToken();
  
        if (!token) {
          alert("Please log in again.");
          return;
        }
  
        const response = await fetch(`${api_url}/${task._id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, status }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to update this task, ${response.status}`);
        }
  
        // Rename 'task' to 'updatedTask' to avoid shadowing
        let updatedTask;
try {
    updatedTask = await response.json();
} catch (error) {
    throw new Error("Failed to parse server response");
}
  
        // Navigate back to the todos page
        router.push("/todos");
      } catch (error) {
        alert(`Failed to edit task, ${error.message}`);
      }
    };
  
    return (
      <>
        <div className="w-full flex flex-col justify-center items-center">
          <form
            onSubmit={handleEditTask}
            className="flex flex-col w-4/5 my-3 py-12 px-6 rounded-sm shadow-gray-400 shadow-lg space-y-9"
          >
            <div className="w-full flex flex-col space-y-4 justify-center items-start">
              <label htmlFor="title" className="font-bold">
                Program Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Program Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="outline outline-gray-800 text-amber-900 rounded-sm px-1 h-8 w-full"
              />
            </div>
            <div className="w-full flex flex-col space-y-4 justify-center items-start">
              <label htmlFor="description" className="font-bold">
                Student Description
              </label>
              <textarea
                rows="6"
                name="description"
                placeholder="Student Description"
                value={description}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                className="outline outline-gray-800 text-amber-900 rounded-sm px-1 h-8 w-full"
              />
            </div>
            <div className="w-full flex flex-col space-y-4 justify-center items-start">
              <label htmlFor="title" className="font-bold text-blue-700">
                Date Created
              </label>
              <span className="font-semibold text-xs text-amber-700">
                {task?.time || "N/A"}
              </span>
            </div>
            <div className="w-full flex flex-col space-y-4 justify-center items-start">
              <label htmlFor="title" className="font-bold text-green-400">
                Status
              </label>
              <select
                className="outline outline-gray-800 text-blue-800 rounded-sm px-1 h-8 w-full"
                name="status"
                value={status.toString()}
                onChange={(e) => setStatus(e.target.value === "true")}
              >
                <option value="true">Signed</option>
                <option value="false">Not Signed</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
  
  export default EditTask;
