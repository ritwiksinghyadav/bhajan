'use client';
import { useEffect } from 'react';

export default function SWRegistration() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/sw.js', { scope: '/' })
                    .then((reg) => {
                        console.log('[SW] Registered, scope:', reg.scope);
                        // Check for updates every 60s
                        setInterval(() => reg.update(), 60_000);
                    })
                    .catch((err) => console.warn('[SW] Registration failed:', err));
            });
        }
    }, []);

    return null;
}
