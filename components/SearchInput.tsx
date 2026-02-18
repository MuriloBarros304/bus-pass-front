'use client';

import { useState } from "react";

interface SearchInputProps {
    type: string;
    onSearch: (text: string) => void;
}

const SearchInput = ({ type, onSearch }: SearchInputProps) => {
    const [text, setText] = useState("");
    const handleButtonClick = () => {
        onSearch(text); // Envia o texto atual para o componente pai
    };
    return (
    <form className="max-w-md mx-auto">
        <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Pesquisar</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
            </div>
            <input type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-neutral-secondary-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder={`Pesquisar ${type}`} required onChange={(e) => setText(e.target.value)} />
            <button
            type="button"
            className="text-brand-text absolute end-1.5 bottom-1.5 bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xs px-3 py-1.5 focus:outline-none"
            onClick={handleButtonClick}
            >
                Pesquisar
                </button>
        </div>
    </form>
    );
}

export default SearchInput;
