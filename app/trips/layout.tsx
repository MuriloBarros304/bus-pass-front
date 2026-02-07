'use client';

import React from 'react';

interface TripsLayoutProps {
    children: React.ReactNode;
}

export default function TripsLayout({ children }: TripsLayoutProps) {
    return (
        <div>
        <main>
            {children}
        </main>
        </div>
    );
}