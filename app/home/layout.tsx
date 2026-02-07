'use client';

import React from 'react';

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div>
        <main>
            {children}
        </main>
        </div>
    );
}