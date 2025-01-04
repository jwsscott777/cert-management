"use client"
import React from 'react'
import Image from 'next/image'
import {useRouter} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import {useAuth} from "@clerk/nextjs";

const api_url = process.env.NEXT_PUBLIC_API_URL;
function Delete({item_id}) {
    const {userId, getToken} = useAuth();
    const router = useRouter();
    const handleTaskDelete = async() =>{
        try{
            if(!userId){
                return (<div>You are not logged in</div>)
            }
            const token = await getToken();

            if(!token){
                return (<div>Hmm, please try logging again</div>)
            }

            const response = await fetch(`${api_url}/${item_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if(!response.ok){
                throw new Error(`Failed to delete task, ${response.status}`);
            }

            //alert(`Deleted, ${response.status}`);
            router.refresh()
        }catch (error){
            console.log("Error in deleting this item");
            return;
        }
    }

  return (
      <>
          <div className='w-full flex justify-end lg:w-1/3'>
              <button type='button'
                  title={"Delete"} onClick={handleTaskDelete}>
                  <Image
                      src="/delete.svg"
                      width={80}
                      height={80}
                      alt={"Delete Task"}
                      style={{ filter: "invert(0.5) sepia(2) saturate(9) hue-rotate(5deg)" }}
                  />
              </button>
          </div>
      </>
  )
}

export default Delete

