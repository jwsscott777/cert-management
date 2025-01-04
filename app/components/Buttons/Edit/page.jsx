"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Image from 'next/image'

function Edit() {
  return (
      <>
          <div className='w-full flex justify-end lg:w-1/3'>
              <button type='button'>
                  <Image
                    src="/edit.svg"
                    width={80}
                    height={80}
                    alt={"Edit Button"}
                    title={"Edit"}
                    style={{ filter: "invert(0.5) sepia(1) saturate(5) hue-rotate(180deg)" }}
                  />
              </button>
        </div>
        </>
  )
}

export default Edit