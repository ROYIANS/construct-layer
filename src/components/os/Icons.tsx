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
            {/* Outer circle shadow */}
            <circle cx="24" cy="24" r="22" fill="url(#chrome-shadow)" />

            {/* Main circle */}
            <circle cx="24" cy="24" r="20" fill="white" />

            {/* Red section */}
            <path d="M24 4 C33.941 4 42 12.059 42 22 L24 22 Z" fill="#EA4335" />

            {/* Yellow section */}
            <path d="M42 22 C42 31.941 33.941 40 24 40 L24 22 Z" fill="#FBBC04" />

            {/* Green section */}
            <path d="M24 40 C14.059 40 6 31.941 6 22 L24 22 Z" fill="#34A853" />

            {/* Center blue circle */}
            <circle cx="24" cy="24" r="10" fill="#4285F4" />

            {/* Inner white circle */}
            <circle cx="24" cy="24" r="7" fill="white" />

            <defs>
                <radialGradient id="chrome-shadow">
                    <stop offset="0%" stopColor="#333" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#333" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    ),
    WeChat: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            {/* Background rounded square */}
            <rect x="2" y="2" width="44" height="44" rx="8" fill="#07C160" />

            {/* Left bubble (larger) */}
            <ellipse cx="18" cy="20" rx="10" ry="9" fill="white" />

            {/* Left bubble eyes */}
            <circle cx="15" cy="19" r="1.5" fill="#07C160" />
            <circle cx="21" cy="19" r="1.5" fill="#07C160" />

            {/* Right bubble (smaller, overlapping) */}
            <ellipse cx="32" cy="28" rx="9" ry="8" fill="white" />

            {/* Right bubble eyes */}
            <circle cx="29" cy="27" r="1.3" fill="#07C160" />
            <circle cx="35" cy="27" r="1.3" fill="#07C160" />
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
    ),
    VSCode: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            {/* Main VS Code logo shape */}
            <defs>
                <linearGradient id="vscode-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0078d4" />
                    <stop offset="100%" stopColor="#005a9e" />
                </linearGradient>
            </defs>

            {/* Background */}
            <rect x="2" y="2" width="44" height="44" rx="2" fill="url(#vscode-gradient)" />

            {/* VS Code X shape */}
            <path d="M36 8 L36 40 L26 34 L12 40 L12 8 L26 14 Z" fill="#ffffff" opacity="0.95" />
            <path d="M26 14 L12 22 L26 30 L26 14 Z" fill="#007acc" opacity="0.3" />
        </svg>
    ),
    PDF: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            <path d="M14 11a3 3 0 0 1 3-3h14l9 9v20a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V11z" fill="#ff4d4f" stroke="none" />
            <path d="M40 20H30V10" fill="#ff7875" fillOpacity="0.5" />
            <path d="M12 16h24v24H12z" fill="#ffffff" fillOpacity="0.1" />
            <text x="50%" y="65%" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">PDF</text>
        </svg>
    ),
    Word: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            <rect x="6" y="6" width="36" height="36" rx="3" fill="#1890ff" />
            <path d="M14 14h20v20H14z" fill="white" fillOpacity="0.2" />
            <path d="M15 32l3-14h4l2 10 2-10h4l3 14h-4l-1-8-3 8h-3l-3-8-1 8h-3z" fill="white" />
        </svg>
    ),
    Excel: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            <rect x="6" y="6" width="36" height="36" rx="3" fill="#52c41a" />
            <path d="M14 14h20v20H14z" fill="white" fillOpacity="0.2" />
            <path d="M30 15h-4v6h-6v4h6v6h4v-6h6v-4h-6v-6z" fill="white" transform="rotate(45 25 24)" />
            <text x="50%" y="65%" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">X</text>
        </svg>
    ),
    Image: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 48 48" className={className} fill="none">
            <rect x="6" y="8" width="36" height="32" rx="2" fill="#9254de" />
            <circle cx="18" cy="18" r="4" fill="#ffec3d" />
            <path d="M42 34l-10-14-8 10-6-6-12 16h36z" fill="#722ed1" />
        </svg>
    ),
    ArrowLeft: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    ),
    Refresh: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
    ),
    Home: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    Star: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    Menu: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
        </svg>
    ),
    CloseTab: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    )
};
