'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors mb-4"
        >
            Voltar
        </button>
    );
};

export default BackButton;