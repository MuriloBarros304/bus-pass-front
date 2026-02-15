'use client';

import Link from "next/link";

const Admin = () => {
    const adminItems = [
        { name: 'Viagens', to: 'admin/trips', desc: ['Criar', 'Excluir', 'Editar']},
        { name: 'Usuários', to: 'admin/users', desc: ['Editar', 'Ver']},
        { name: 'Documentos', to: 'admin/documents', desc: ['Gerenciar', 'Aprovar/Rejeitar']},
    ]

    return (
        <div>
            <h1 className="mb-5">Administração</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminItems.map((item, index) => (
                    <Link key={index} href={item.to} className="text-2xl bg-neutral-primary-soft block max-w-md p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium mt-5">
                        <h2>{item.name}</h2>
                        <ul className="list-disc text-xs ml-5">
                            {item.desc.map((element, idx) => (
                                <li key={idx}>{element}</li>
                            ))}
                        </ul>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Admin;