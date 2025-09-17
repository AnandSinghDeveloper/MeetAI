"use client"
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation';
import React from 'react'

const HomeView = () => {

  const router = useRouter();

  const {data:session}= authClient.useSession();

  if (!session) {
    return(
      <div>
        loading...
      </div>
    )
  }

  return (
    <div className='flex flex-col p-4 gap-y-4'>
      <p>Welcome {session.user.name}</p>
      <Button onClick={async () => await authClient.signOut({
        fetchOptions:{
          onSuccess: () => {
            router.push("/SignIn")
          }
        }
      })}>
        SignOut
      </Button>
    </div>
  )
}


export default HomeView
