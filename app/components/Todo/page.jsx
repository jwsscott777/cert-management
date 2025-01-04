"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Delete from '../Buttons/Delete/page'
import Edit from '../Buttons/Edit/page'
import Link from 'next/link'
export const dynamic = "force-dynamic";
function Todo({ task }) {
    if (!task) {
        return <div className="text-red-500">Error: Task data is missing.</div>;
      }
  return (
      <>
        <div className='flex flex-col justify-center items-start space-y-2 border-2 border-gray-700 p-4 w-full lg:w-4/5 rounded-lg shadow-gray-500/50 shadow-lg'>
              <h1 className='text-4xl font-extrabold text-amber-600'>{ task.title}</h1>
              <p className="text-blue-200">{ task.description}</p>
            <div className='flex flex-row justify-between items-center w-full text-xs font-bold'>
                <span className='text-gray-500'>Created: { task.time}</span>

                {task.updatedTime && task.updatedTime? (
                    <span className='text-blue-500'>Updated: {task.updatedTime}</span>
                ):(
                    <></>
                )}

                {task.status ?
                    (<span className='text-teal-600'>Signed: Waiting for Pickup</span>)
                      :
                      (<span className='text-red-500'> Not Signed</span>)
                  }
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
                  <div>
                      <Link href={`/todos/edit-task/${task._id}`}><Edit/></Link>
                  </div>
                  <div>
                      <Delete item_id={task._id}/>
                  </div>
            </div>
        </div>
      </>
  )
}
export default Todo  