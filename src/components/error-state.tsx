import React from 'react'
import { AlertCircleIcon } from 'lucide-react'

interface Props {
  title: string
  discription: string
}
const ErrorState = ({ title, discription }: Props) => {
  return (
    <div className=' py-4 px-8 flex flex-1  items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-y-6 bg-background  rounded-lg p-10 shadow-sm'>
            <AlertCircleIcon className=" size-6 text-red-500" />
            <div className='flex flex-col text-center gap-y-2'>
            <h6 className='text-lg font-medium'>{title}</h6> 
            <p className='text-muted-foreground text-sm'>{discription}</p>
            </div>
      </div>
    </div>
  )
}

export default ErrorState
