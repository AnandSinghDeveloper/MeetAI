import React from 'react'
import { TbLoader3 } from 'react-icons/tb'

interface Props {
  title: string
  discription: string
}
const LoadingState = ({ title, discription }: Props) => {
  return (
    <div className=' py-4 px-8 flex flex-1  items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-y-6 bg-background  rounded-lg p-10 shadow-sm'>
            <TbLoader3 className="animate-spin size-6 text-primary" />
            <div className='flex flex-col text-center gap-y-2'>
            <h6 className='text-lg font-medium'>{title}</h6> 
            <p className='text-muted-foreground text-sm'>{discription}</p>
            </div>
      </div>
    </div>
  )
}

export default LoadingState
