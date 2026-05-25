'use client';
import * as React from 'react';
import Image from 'next/image';

export default function SettingPage() {
    return (
        <div 
            className='min-h-screen w-full p-6 flex flex-col items-center justify-center'
            style={{ backgroundColor: '#FFF5E1' }}
        >
            <div className='bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full border border-red-100'>
                <div className='relative h-[100px] w-[100px] bg-red-50 rounded-full p-2 mb-6 shadow-sm border border-red-100'>
                    <Image
                        className='h-full w-full rounded-full object-cover'
                        src={'/logo.png'}
                        alt='logo'
                        fill
                    />
                </div>
                <h1 className='text-3xl font-bold text-primary-primaryRed mb-4'>Settings</h1>
                <p className='text-gray-600 text-center text-lg leading-relaxed'>
                    This is a dummy Settings page. Configuration options will be added here later.
                </p>
                <div className='mt-8 h-1 w-24 bg-primary-primaryRed rounded-full opacity-50'></div>
            </div>
        </div>
    );
}
