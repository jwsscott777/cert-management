/* eslint-disable @typescript-eslint/no-unused-vars */
export const dynamic = 'force-dynamic';
import React from 'react'
import Todo from '@/app/components/Todo/page';
import {auth} from "@clerk/nextjs/server";

const api_url = process.env.NEXT_PUBLIC_API_URL;

async function Todos() {
    try{
        const {userId, getToken} = await auth();

        if(!userId){
            return (<div>You are not logged in</div>)
        }
        const token = await getToken();

        if(!token){
            return (<div>Hmm, please try logging again</div>)
        }
        // Make the request
        const response = await fetch(api_url, {
            cache: "no-store",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(!response.ok){
            throw new Error(`Cant fetch data from the DB, ${response.status}`);
        }
        const {data:tasks} = await response.json();
       
        return (
            <>
                <div className="flex flex-col min-h-screen bg-black">
                    {/* Main Content */}
                    <div className="flex-grow flex flex-col justify-center items-center w-full p-12">
                        <div className='flex flex-col justify-center items-center w-3/4 m-5 p-6 space-y-5'>
                            {tasks && tasks.length > 0 ? (
                                [...tasks].reverse().map((task) => (
                                    <Todo key={task._id} task={task} />
                                ))
                            ) : (
                                
                                <div className="font-extrabold text-red-500">
                                    No Certificates Found Click Add Certificate 
                                    </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-gray-800 text-white py-4">
                        <div className="text-center">© 2025 Certificate Manager. All rights reserved.</div>
                    </footer>
                </div>
            </>
        );

    }catch(err){
        throw new Error(`Server Error, ${err.message}`);
    }
}

export default Todos

