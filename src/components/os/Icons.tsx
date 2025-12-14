import React from 'react';

export const Icons = {
    Computer: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="8" width="40" height="28" rx="2" fill="#3b82f6" stroke="none" />
            <path d="M4 36h40M14 42h20" stroke="#374151" />
            <rect x="8" y="12" width="32" height="20" rx="1" fill="#eff6ff" stroke="none" />
        </svg>
    ),
    Folder: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            <path d="M4 10a2 2 0 0 1 2-2h12l4 4h20a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        </svg>
    ),
    FileText: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            <path d="M10 6a2 2 0 0 1 2-2h18l10 10v28a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V6z" fill="#ffffff" stroke="#9ca3af" strokeWidth="2" />
            <path d="M30 4v10h10" stroke="#9ca3af" strokeWidth="2" />
            <line x1="18" y1="20" x2="30" y2="20" stroke="#d1d5db" strokeWidth="2" />
            <line x1="18" y1="28" x2="30" y2="28" stroke="#d1d5db" strokeWidth="2" />
            <line x1="18" y1="36" x2="26" y2="36" stroke="#d1d5db" strokeWidth="2" />
        </svg>
    ),
    RecycleBin: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            <path d="M12 12h24l-2 28H14L12 12z" fill="#ffffff" stroke="#9ca3af" strokeWidth="2" />
            <path d="M18 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M8 12h32" stroke="#9ca3af" strokeWidth="2" />
            <line x1="20" y1="18" x2="20" y2="34" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="28" y1="18" x2="28" y2="34" stroke="#e5e7eb" strokeWidth="2" />
        </svg>
    ),
    Chrome: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            <circle cx="24" cy="24" r="20" fill="#ffffff" stroke="none" />
            <circle cx="24" cy="24" r="8" fill="#3b82f6" />
            <path d="M24 4C12.95 4 4 12.95 4 24h20V4z" fill="#ef4444" />
            <path d="M4 24c0 11.05 8.95 20 20 20v-9.17L13.17 24H4z" fill="#22c55e" />
            <path d="M24 44c11.05 0 20-8.95 20-20h-9.17l-5.83 10.83L24 44z" fill="#eab308" />
        </svg>
    ),
    Start: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="#ffffff">
            <path d="M0 3.44L9.38 2.13v9.64H0V3.44zm10.74-1.63L24 0v11.77H10.74V1.81zM0 12.87h9.38v9.75L0 20.91v-8.04zm10.74 0H24v11.13l-13.26-1.87V12.87z" />
        </svg>
    ),
    Minimize: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M19 13H5v-2h14v2z" />
        </svg>
    ),
    Maximize: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" />
        </svg>
    ),
    Close: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
    ),
    Search: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    UpArrow: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
    ),
    Power: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
        </svg>
    )
};
