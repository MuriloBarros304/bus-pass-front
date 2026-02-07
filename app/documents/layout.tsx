'use client';

import React from 'react';

interface DocumentsLayoutProps {
    children: React.ReactNode;
}

export default function DocumentsLayout({ children }: DocumentsLayoutProps) {
    return (
        <div>
        <main>
            {children}
        </main>
        </div>
    );
}