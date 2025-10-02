import React from 'react'
import { AlertCircleIcon } from 'lucide-react'
import Image from 'next/image'

interface Props {
  title: string
  discription: string
  image?: string
}
const EmptyState = ({ title, discription , image="/empty.svg"}: Props) => {
  return (
    <div className='  flex flex-col  items-center justify-center'>
      
           <Image src={image} alt='logo' width={240} height={240}/>
            <div className='flex flex-col text-center mx-auto max-w-md gap-y-6'>
            <h6 className='text-lg font-medium'>{title}</h6> 
            <p className='text-muted-foreground text-sm'>{discription}</p>
          
      </div>
    </div>
  )
}

export default EmptyState
