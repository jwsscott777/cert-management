import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {SignedIn, SignedOut, SignInButton, SignOutButton, UserButton} from "@clerk/nextjs";

const Menu = () => {
    return (
        <>
            <nav className="flex flex-row items-center justify-between w-full h-auto bg-white border-b-2 text-black border-gray-200 px-4">
                <div className="w-1/5 py-2">
                    <Link href="/" className="text-xl text-gray-800 font-extrabold">
                        <Image src={"/logo.svg"} width={40} height={40} alt={"SupaTodo logo"} title={"SupaTaskManager"}/>
                    </Link>
                </div>
                <div className="flex flex-row justify-end items-center w-4/5 py-2">
                    <div className="flex flex-row space-x-4 justify-between items-center">
                        <SignedIn>
                            <Link href={"/todos"} className="cursor-pointer">
                                <button
                                    className="text-black hover:text-amber-500 mx-1 p-2 duration-100 transition-all font-bold capitalize">Recent
                                    Certificates
                                </button>
                            </Link>
                            <Link href={"/add-task"} className="cursor-pointer">
                                <button className="text-black hover:text-amber-500 mx-1 p-2 font-bold capitalize">Add
                                    Certificate
                                </button>
                            </Link>
                            <Link href={"/organization-switcher"} className="cursor-pointer">
                                <button className="text-black hover:text-amber-500 mx-1 p-2 font-bold capitalize">
                                    Switch Organization
                                </button>
                            </Link>
                            <UserButton/>
                            <span className="flex justify-center items-center transition-all duration-200 font-bold hover:text-amber-600"><SignOutButton/></span>
                        </SignedIn>

                        <SignedOut>
                            <span className="flex justify-center items-center font-bold hover:text-amber-600">
                                <SignInButton mode="modal"/>
                            </span>
                        </SignedOut>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Menu;