import * as React from 'react';
import bhajanList from '../../../../public/filesList.json'
// import { PdfViewer } from '@/app/_comp/_compo';
import Header from './headercomp';
import dynamic from 'next/dynamic';
// import PDFViewer from '@/app/_comp/comp2';
const PdfViewerComponent = dynamic(() => import("@/app/_comp/comp2"), { ssr: false, });
export interface IAppProps {
    params: any
}

export default async function App({ params }: IAppProps) {
    const data = bhajanList.find((item: any) => item.id == params.id)
    return (
        <div className='h-full w-full flex flex-col '>
            {/* header  */}

            <section className='h-[100vh-60px] w-full'>
                <Header name={data?.name} />
                <div className='w-full h-[calc(100vh-60px)]'>

                    <PdfViewerComponent pdfUrl={`../bhajanPDF/${data?.fileName}`} />
                </div>
            </section>
        </div >
    );
}
