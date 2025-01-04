import AddTask from '@/app/components/AddTask/page'
import React from 'react'

function AddTodo() {
  return (
    <>
      <div className="bg-black text-white flex flex-col justify-center items-center w-full h-[80dvh]">
        <div className="flex flex-col justify-center items-center w-4/5">
          <h1 className='text-4xl font-extrabold'>Add New Certificate</h1>
          <AddTask/>
        </div>
      </div>
    </>
  )
}

export default AddTodo