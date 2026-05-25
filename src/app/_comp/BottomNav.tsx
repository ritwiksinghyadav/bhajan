'use client';
import { Home, BookOpen, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const navItems = [
    { icon: Home, label: 'Home', href: '/bhajan' },
    { icon: BookOpen, label: 'Vidhi', href: '/vidhi' },
    { icon: Settings, label: 'Setting', href: '/setting' },
];

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();

    const isBhajanDetail = /^\/bhajan\/\d+$/.test(pathname);
    if (isBhajanDetail) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            {/* Frosted glass pill */}
            <div
                style={{
                    background: 'rgba(255, 60, 60, 0.15)',
                    backdropFilter: 'blur(28px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                    border: '1px solid rgba(255, 120, 100, 0.3)',
                    boxShadow: '0 4px 28px rgba(255,76,76,0.18), 0 1px 0 rgba(255,255,255,0.5) inset',
                    borderRadius: 100,
                    height: 52,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    gap: 6,
                }}
            >
                {navItems.map(({ icon: Icon, label, href }) => {
                    const isActive = pathname === href || (href === '/bhajan' && pathname === '/');
                    return (
                        <button
                            key={href}
                            onClick={() => router.push(href)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: isActive ? '#FF4C4C' : 'transparent',
                                border: 'none',
                                borderRadius: '50%',
                                width: 38,
                                height: 38,
                                cursor: 'pointer',
                                transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease',
                                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                                boxShadow: isActive ? '0 4px 14px rgba(255,76,76,0.45)' : 'none',
                            }}
                        >
                            <Icon
                                style={{
                                    width: 19,
                                    height: 19,
                                    color: isActive ? '#ffffff' : 'rgba(90,40,40,0.6)',
                                    strokeWidth: isActive ? 2.5 : 1.8,
                                    transition: 'color 0.2s ease',
                                }}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
