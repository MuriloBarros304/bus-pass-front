'use client';

import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
    const menuItems = [
        { name: 'Início', to: 'home' },
        { name: 'Viagens', to: 'trips' },
        { name: 'Documentos', to: 'documents' },
        { name: 'Perfil', to: 'user' },
        { name: 'Sobre a página', to: '/' },
        { name: 'Administração', to: 'admin' },
    ];

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`${isOpen ? 'w-64' : 'w-14 overflow-hidden '} fixed top-0 left-0 h-full z-50 bg-gray-800 text-white p-4 transition-all duration-200`}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 whitespace-nowrap">{isOpen && 'Bus Pass'}</h2>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index} className="mb-3">
                        <Link href={item.to} className="hover:underline">
                            <span className={`${isOpen ? 'opacity-100 duration-150 ' : 'opacity-0 duration-0 '} transition-opacity  `}>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;