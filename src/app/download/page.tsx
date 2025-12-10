'use client';
import { Download, ArrowLeft, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function DownloadPage() {
    const router = useRouter();
    const [showInstructions, setShowInstructions] = useState(false);

    const handleDownload = () => {
        // Direct download from Google Drive
        window.location.href = 'https://drive.google.com/uc?export=download&id=10vXZc69YKQ1LZmgUGcy_maOkMHH9UTaH';
    };

    return (
        <div className='min-h-screen w-full bg-yellow-100'>
            {/* Header */}
            <header className='sticky top-0 z-10 bg-primary-primaryRed rounded-md mx-1 mt-1'>
                <div className='h-16 flex items-center justify-between px-4'>
                    <button
                        onClick={() => router.push('/bhajan')}
                        className='flex items-center gap-2 text-white hover:text-yellow-100 transition'
                    >
                        <ArrowLeft className='h-5 w-5' />
                        <span className='font-medium'>Back</span>
                    </button>
                    <div className='font-bold text-white text-xl'>
                        Download App
                    </div>
                    <div className='relative h-10 w-10 bg-white rounded-full p-1'>
                        <Image
                            src={'/logo.png'}
                            alt='भजनामृत'
                            fill
                            className='rounded-full object-cover'
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className='max-w-2xl mx-auto px-4 py-12'>
                {/* Hero Section */}
                <div className='text-center mb-12'>
                    <h1 className='text-4xl md:text-5xl font-bold text-[#ab3116] mb-3'>
                        भजनामृत
                    </h1>
                    <p className='text-[#ab3116] text-lg mb-8'>
                        Download the mobile app
                    </p>

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        className='group bg-primary-primaryRed hover:bg-[#8a2612] text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center gap-3 mx-auto transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
                    >
                        <Download className='h-6 w-6 group-hover:animate-bounce' />
                        Download for Android
                    </button>

                    <p className='text-sm text-gray-600 mt-4'>
                        Currently available for Android only
                    </p>
                </div>

                {/* Installation Guide Toggle */}
                <div className='bg-[#FFF5E1] rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
                    <button
                        onClick={() => setShowInstructions(!showInstructions)}
                        className='w-full px-6 py-4 flex items-center justify-between hover:bg-yellow-50 transition'
                    >
                        <span className='font-semibold text-[#ab3116]'>Installation Guide</span>
                        <ChevronDown 
                            className={`h-5 w-5 text-[#ab3116] transition-transform ${showInstructions ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {showInstructions && (
                        <div className='px-6 pb-6 space-y-6 border-t border-gray-200 pt-6'>
                            {/* Step 1 */}
                            <div className='flex gap-4'>
                                <div className='flex-shrink-0 w-8 h-8 bg-primary-primaryRed text-white rounded-full flex items-center justify-center text-sm font-bold'>
                                    1
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-semibold text-[#ab3116] mb-1'>
                                        Enable Unknown Sources
                                    </h3>
                                    <p className='text-sm text-gray-700 leading-relaxed'>
                                        Go to <strong>Settings</strong> → <strong>Security</strong> → Enable <strong>Unknown sources</strong>
                                    </p>
                                    <p className='text-xs text-gray-600 mt-2'>
                                        For Android 8.0+: Settings → Apps → Special access → Install unknown apps → Select your browser
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className='flex gap-4'>
                                <div className='flex-shrink-0 w-8 h-8 bg-primary-primaryRed text-white rounded-full flex items-center justify-center text-sm font-bold'>
                                    2
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-semibold text-[#ab3116] mb-1'>
                                        Download & Install
                                    </h3>
                                    <p className='text-sm text-gray-700 leading-relaxed'>
                                        Click the download button, open the APK file, and tap <strong>Install</strong>
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className='flex gap-4'>
                                <div className='flex-shrink-0 w-8 h-8 bg-primary-primaryRed text-white rounded-full flex items-center justify-center text-sm font-bold'>
                                    3
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-semibold text-[#ab3116] mb-1'>
                                        Security Tip
                                    </h3>
                                    <p className='text-sm text-gray-700 leading-relaxed'>
                                        After installation, disable unknown sources for security
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Note */}
                <div className='mt-6 bg-white border-l-4 border-yellow-500 rounded-md shadow-md p-4'>
                    <p className='text-sm text-gray-700'>
                        <strong>Note:</strong> This APK is safe and contains the same content as the web version. 
                        iOS version coming soon!
                    </p>
                </div>
            </main>
        </div>
    );
}
