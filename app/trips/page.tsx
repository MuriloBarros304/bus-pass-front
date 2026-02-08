'use client';

import SearchInput from "../../components/searchInput";

function Trips() {
    return (
        <div>
            <h1 className="mb-5">Viagens</h1>
            <SearchInput type="viagens" />
            <a href="#" className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">UFRN - Matutino</h5>
                <ul>
                    <li className="">Origem: São José de Mipibu</li>
                    <li>Destino: Natal</li>
                    <li>Horário de partida: 05:30</li>
                    <li>Tipo: Prefeitura</li>
                </ul>
            </a>
        </div>
    );
}

export default Trips;