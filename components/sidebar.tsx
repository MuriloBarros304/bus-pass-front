'use client';

function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Bus Pass</h2>
        <ul>
            <li className="mb-2"><a href="home" className="hover:underline">Início</a></li>
            <li className="mb-2"><a href="trips" className="hover:underline">Viagens</a></li>
            <li className="mb-2"><a href="documents" className="hover:underline">Documentos</a></li>
            <li className="mb-2"><a href="user" className="hover:underline">Perfil</a></li>
        </ul>
        </div>
    );
}

export default Sidebar;