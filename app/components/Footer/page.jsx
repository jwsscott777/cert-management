/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Link from 'next/link'

const Footer = () => {
    const date = new Date();
    const currentDate = date.getFullYear();
  return (
    <>
        <footer className='w-full h-auto lg:h-[5dvh] row-start-3 flex flex-wrap items-center justify-center' >
            <div className='w-full flex flex-col lg:flex-row justify-center items-center py-7 border-t border-gray-200'>
                <div className='w-3/5 flex flex-col lg:flex-row items-center justify-center space-x-6 lg:justify-between'>
                <span className='text-sm text-gray-500'>🍇<Link href="https://weldlearn.com" className='hover:text-amber-600' target="_blank">Welding Site: </Link>{currentDate}</span>
                <ul className='flex justify-between items-center gap-9 mt-4 lg:mt-0'>
                    <li><Link href="https://erpportal.browardschools.com/irj/portal" className='text-sm text-gray-500 hover:text-amber-600'>ESS</Link></li>
                    <li><Link href="https://www.mcfattertechnicalcollege.edu/" className='text-sm text-gray-500 hover:text-amber-600'>Mcfatter</Link></li>
                    <li><Link href="/about" className='text-sm text-gray-500 hover:text-amber-600'>Site Help</Link></li>

                </ul>

                </div>

            </div>

        </footer>
    </>
  )
}

export default Footer