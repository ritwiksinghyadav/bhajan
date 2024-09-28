'use client';
import { useEffect, useState } from "react";

export const PdfViewer = ({ pdfUrl }: any) => {
    const [pdfSrc, setPdfSrc] = useState('');

    useEffect(() => {
        // Append #toolbar=0 to disable the toolbar (for Chrome and Firefox)
        setPdfSrc(`${pdfUrl}#toolbar=0&navpanes=0`);
    }, [pdfUrl]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <iframe
                src={pdfSrc}
                className="hidescrollbar overflow-y-auto"
                style={{ width: '100%', height: '100%', border: 'none' }}
                frameBorder="0"
                title="PDF Viewer"
                onContextMenu={(e) => e.preventDefault()} // Disable right-click directly on the iframe
            />
        </div>
    );
};