'use client';
import { FileText, Search } from 'lucide-react';
import * as React from 'react';
import bhajanList from '../../../public/filesList.json'
import { useRouter } from 'next/navigation';
export interface IAppProps {
}

export default function App(props: IAppProps) {
    const router = useRouter()
    return (
        <div className='h-screen w-full flex flex-col p-1 '>
            {/* header  */}
            <section className='sticky top-0 w-full h-[60px] bg-primary-primaryRed rounded-md flex items-center justify-between p-2'>
                <div className='bg-orange h-[50px] w-[50px]'>
                    LOGO
                </div>
                <div className='w-fit h-fit mr-5'>
                    <Search
                        className='h-[25px] w-[25px] stroke-white stroke-4'

                    />
                    {/* <div className=''>
                        Number
                    </div> */}
                </div>
            </section>

            <div className='grid md:grid-cols-4 grid-cols-1 w-full overflow-y-auto gap-5 p-2 hidescrollbar'>
                {/* card */}
                {bhajanList?.map((item: any) =>
                    < div key={item.id} className='h-[50px] w-full rounded-md flex items-center gap-3 shadow-xl bg-[#FFF5E1] p-2'
                        onClick={() => { router.push(`/bhajan/${item.id}`) }}
                    >
                        <FileText
                            className='h-[25x] w-[25px] stroke-primary-primaryRed '
                        />
                        <p className='w-full truncate capitalize '>
                            {
                                item.name
                            }
                        </p>
                    </div>
                )
                }

            </div>
        </div >
    );
}
