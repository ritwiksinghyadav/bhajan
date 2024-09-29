'use client';
import { FileText, Search, X } from 'lucide-react';
import * as React from 'react';
import bhajanList from '../../../public/filesList.json'
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';

export default function App() {
    const router = useRouter()
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Initialize Fuse for fuzzy search
    const fuse = React.useMemo(() => new Fuse(bhajanList, {
        keys: ['name'],
        threshold: 0.4,
    }), []);

    const filteredBhajans = React.useMemo(() => {
        if (!searchQuery) return bhajanList;
        return fuse.search(searchQuery).map(result => result.item);
    }, [searchQuery, fuse]);

    React.useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    return (
        <div className='h-screen w-full flex flex-col p-1'>
            {/* header  */}
            <section className='sticky top-0 w-full h-[60px] bg-primary-primaryRed rounded-md flex items-center justify-between p-2'>
                <div className='bg-orange h-[50px] w-[50px]'>
                    LOGO
                </div>
                <div className='w-fit h-fit mr-5 flex items-center'>
                    {isSearchOpen ? (
                        <div className='flex items-center bg-white rounded-md overflow-hidden'>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search bhajans..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='p-2 outline-none'
                            />
                            <X
                                className='h-[25px] w-[25px] stroke-primary-primaryRed stroke-2 cursor-pointer mr-2'
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                }}
                            />
                        </div>
                    ) : (
                        <Search
                            className='h-[25px] w-[25px] stroke-white stroke-4 cursor-pointer'
                            onClick={() => setIsSearchOpen(true)}
                        />
                    )}
                </div>
            </section>

            <div className='grid md:grid-cols-4 grid-cols-1 w-full overflow-y-auto gap-5 p-2 hidescrollbar'>
                {/* card */}
                {filteredBhajans.map((item: any) =>
                    <button key={item.id} className='h-[50px] w-full rounded-md cursor-pointer flex items-center gap-3 shadow-xl bg-[#FFF5E1] p-2'
                        onClick={() => { router.push(`/bhajan/${item.id}`) }}
                    >
                        <FileText
                            className='h-[25x] w-[25px] stroke-primary-primaryRed '
                        />
                        <p className='w-full truncate capitalize '>
                            {item.name}
                        </p>
                    </button>
                )}
            </div>
        </div>
    );
}
