'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { WifiOff, RefreshCw, Wifi } from 'lucide-react';

type NetStatus = 'online' | 'offline' | 'slow';

// ─── Offline / Slow Page ─────────────────────────
function OfflinePage({
    status,
    onRetry,
    isRetrying,
}: {
    status: NetStatus;
    onRetry: () => void;
    isRetrying: boolean;
}) {
    const isSlow = status === 'slow';

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6"
            style={{ background: '#FFF5E1' }}
        >
            {/* Animated icon circle */}
            <div
                style={{
                    width: 110,
                    height: 110,
                    borderRadius: '50%',
                    background: 'rgba(255,76,76,0.1)',
                    border: '2px solid rgba(255,76,76,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 28,
                    boxShadow: '0 0 0 16px rgba(255,76,76,0.05)',
                }}
            >
                {isSlow ? (
                    <Wifi
                        style={{ width: 48, height: 48, color: '#FF4C4C', opacity: 0.7 }}
                        strokeWidth={1.5}
                    />
                ) : (
                    <WifiOff
                        style={{ width: 48, height: 48, color: '#FF4C4C' }}
                        strokeWidth={1.5}
                    />
                )}
            </div>

            {/* Logo */}
            <div
                style={{
                    position: 'relative',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: 20,
                    border: '3px solid rgba(255,76,76,0.3)',
                    boxShadow: '0 4px 16px rgba(255,76,76,0.15)',
                }}
            >
                <Image src="/logo.png" alt="भजनामृत" fill className="object-cover" />
            </div>

            {/* Title */}
            <h1
                style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: '#FF4C4C',
                    marginBottom: 10,
                    letterSpacing: -0.5,
                    textAlign: 'center',
                }}
            >
                {isSlow ? 'इंटरनेट बहुत धीमा है' : 'इंटरनेट कनेक्शन नहीं है'}
            </h1>

            {/* Subtitle */}
            <p
                style={{
                    fontSize: 15,
                    color: '#8B6355',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    maxWidth: 280,
                    marginBottom: 36,
                }}
            >
                {isSlow
                    ? 'आपका इंटरनेट बहुत धीमा चल रहा है। कृपया कनेक्शन जांचें।'
                    : 'कृपया अपना Wi-Fi या मोबाइल डेटा चालू करें और दोबारा कोशिश करें।'}
            </p>

            {/* Retry Button */}
            <button
                onClick={onRetry}
                disabled={isRetrying}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: isRetrying ? 'rgba(255,76,76,0.5)' : '#FF4C4C',
                    color: 'white',
                    border: 'none',
                    borderRadius: 100,
                    padding: '14px 32px',
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: isRetrying ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 20px rgba(255,76,76,0.35)',
                    transition: 'all 0.2s ease',
                }}
            >
                <RefreshCw
                    style={{
                        width: 18,
                        height: 18,
                        animation: isRetrying ? 'spin 0.8s linear infinite' : 'none',
                    }}
                />
                {isRetrying ? 'जांच रहे हैं...' : 'दोबारा कोशिश करें'}
            </button>

            {/* Divider */}
            <div
                style={{
                    marginTop: 40,
                    padding: '12px 20px',
                    background: 'rgba(255,76,76,0.06)',
                    borderRadius: 12,
                    border: '1px solid rgba(255,76,76,0.15)',
                    maxWidth: 280,
                    textAlign: 'center',
                }}
            >
                <p style={{ fontSize: 13, color: '#8B6355', lineHeight: 1.5 }}>
                    📿 पहले से खुले भजन ऑफलाइन भी पढ़ सकते हैं
                </p>
            </div>

            {/* Spin keyframe injected via style tag */}
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

// ─── Network Guard ────────────────────────────────
export default function NetworkGuard({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<NetStatus>('online');
    const [isRetrying, setIsRetrying] = useState(false);

    const evaluate = useCallback(() => {
        // 1. Hard offline
        if (!navigator.onLine) {
            setStatus('offline');
            return;
        }

        // 2. Network Information API — slow connection
        const nav = navigator as any;
        const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
        if (conn) {
            const slow = ['slow-2g', '2g'];
            if (slow.includes(conn.effectiveType)) {
                setStatus('slow');
                return;
            }
        }

        setStatus('online');
    }, []);

    useEffect(() => {
        // Initial check (run on client only)
        evaluate();

        const handleOnline = () => evaluate();
        const handleOffline = () => setStatus('offline');

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Network Information API change listener
        const conn = (navigator as any).connection;
        conn?.addEventListener('change', evaluate);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            conn?.removeEventListener('change', evaluate);
        };
    }, [evaluate]);

    const handleRetry = async () => {
        setIsRetrying(true);
        // Brief pause for UX, then re-evaluate
        await new Promise((r) => setTimeout(r, 700));
        evaluate();
        setIsRetrying(false);
    };

    if (status === 'offline' || status === 'slow') {
        return <OfflinePage status={status} onRetry={handleRetry} isRetrying={isRetrying} />;
    }

    return <>{children}</>;
}
