"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {useAuth} from "@clerk/nextjs";

const api_url = process.env.NEXT_PUBLIC_API_URL

function AddTask() {

  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [status, setStatus] = useState(false);
  const {userId, getToken} = useAuth();

  const router = useRouter();

  const handlePostTask = async (e) => { 
    e.preventDefault();

    try{
        if(!userId){
            return (<div>You are not logged in</div>)
        }
        const token = await getToken();

        if(!token){
            return (<div>Hmm, please try logging again</div>)
        }

        const response = await fetch(api_url,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, status, userId }),
            });

        if (!response.ok) {
            throw new Error("Failed to creating new tasks");
        }

        const {data:newTask} = await response.json();
        //console.log("New task", newTask)
        setTitle('');
        setDesc('');
        setStatus(false);
        router.push("/todos");
    }catch(err){
        console.error('Error creating Todo:', err);
        setTitle('');
        setDesc('');
        setStatus(false);
    }
  }
  return (
      <>
      
          <div className='w-full flex flex-col justify-center items-center'>
        <form onSubmit={ handlePostTask} className='flex flex-col w-4/5 my-3 py-12 px-6 rounded-sm shadow-gray-400 shadow-lg space-y-9'>
                  <div className="w-full flex flex-col space-y-4 justify-center it-start">
                    <label htmlFor="title" className='font-bold'>Program Title</label>
            <input type="text" name="title"  placeholder='Program Title' value={title} onChange={(e) => setTitle(e.target.value)} required className='outline outline-gray-800 text-amber-900 rounded-sm px-1 h-8 w-full'/>
                  </div>
                  <div className="w-full flex flex-col space-y-4 justify-center items-start">
                    <label htmlFor="description" className='font-bold'>Student Description</label>
            <textarea rows="6" name="description" placeholder='Student Description' value={description} onChange={(e) => setDesc(e.target.value)}  required className='outline outline-gray-800 text-amber-900 rounded-sm px-1 h-8 w-full'/>
                  </div>
                  <div className="w-full flex flex-col space-y-4 justify-center items-start">
                      <label htmlFor="title" className='font-bold text-green-400'>Status</label>
            <select className='outline outline-gray-800 text-blue-800 rounded-sm px-1 h-8 w-full'
              name="status"
              value={status.toString()} onChange={(e) => setStatus(e.target.value == 'true')} required>
                          <option value="true">Completed</option>
                          <option value="false">Not Completed</option>
                      </select>
          </div>
          <button type="submit" className='bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded'>Submit</button>
          </form>
        </div>
     
      </>
  )
}

export default AddTask


