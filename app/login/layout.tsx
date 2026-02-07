'use client';

import React from 'react';

interface LoginLayoutProps {
    children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
    return (
        <div>
        <main>
            {children}
        </main>
        </div>
    );
}