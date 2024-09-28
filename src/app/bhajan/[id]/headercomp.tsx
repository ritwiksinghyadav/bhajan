'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface IAppProps {
    name: string | undefined
}

export default function Header({ name }: IAppProps) {
    const router = useRouter()

    return (
        <section className='sticky top-0 w-full h-[60px] bg-primary-primaryRed rounded-md flex items-center justify-between p-2'>
            <ChevronLeft
                className='h-[40px] w-[40px] stroke-yellow-300 stroke-4'
                onClick={() => { router.push('/bhajan') }}
            />
            <div className='w-full  text-center text-lg truncate font-bold capitalize text-yellow-300'>
                {name}
            </div>
            <div className='w-1 h-2'>

            </div>
        </section>
    );
    // <div className='flex items-center h-[20px]'>
    //     <ChevronLeft
    //         className='h-[20px] w=[20px] stroke-primary-primaryRed'
    //         onClick={() => { router.push('/bhajan') }}
    //     />
    //     {name}
    // </div>
}
