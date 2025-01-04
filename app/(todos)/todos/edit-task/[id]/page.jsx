"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import EditTask from '@/app/components/EditTask/page';
import {useAuth} from "@clerk/nextjs";

const api_url = process.env.NEXT_PUBLIC_API_URL;

function TodoDetailPage() {
   // const { id } = useParams();
    const id = useParams()?.id || null; // Safely destructure with a fallback
    const [task, setTask] = useState(null);
    const [error, setError] = useState(null);
    // get user details using a client side approach [no need for await]
    const {userId, getToken} =  useAuth();

    useEffect(() => {
        const fetchTask = async() =>{
            try{
                if(!userId){
                    return (<div>You are not logged in</div>)
                }
                const token = await getToken();

                if(!token){
                    return (<div>Hmm, please try logging again</div>)
                }
                const taskResponse = await fetch(`${api_url}/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!taskResponse.ok){
                    throw new Error(`Failed ot fetch item from the DB, ${taskResponse.status}`);
                }
                const {data: taskItem} = await taskResponse.json();
                setTask(taskItem);
            }catch(err){
                setError(err);
                //throw new Error(err.message);
            }
        };
        if(id){
            fetchTask();
        }
    },[id]);

    if(error){
        return <div>Error: {error}</div>
    }

    if(!task){
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="bg-black text-white flex flex-col justify-center items-center w-full h-[80dvh]">
                <div className="flex flex-col justify-center items-center w-4/5">
                    <h1 className='text-4xl font-extrabold line-clamp-1 text-amber-700'>
                        <span className='text-amber-700'>Certificate: </span>
                        <span className='text-blue-700'>{task.title}</span>
                        </h1>
                    <EditTask task={task}/>
                </div>
            </div>
        </>
    );
}

export default TodoDetailPage;

