'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import LoadingSpinner from "./LoadingSpinner";
import { TripType } from "@/types/trip";
import { deleteTrip, readTrips } from "@/services/trips";
import { useRouter } from "next/navigation";

interface TripsGridProps {
    isAdmin?: boolean;
}

const TripsGrid = ({ isAdmin }: TripsGridProps) => {
    const [trips, setTrips] = useState<TripType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [tripToDelete, setTripToDelete] = useState<number | undefined>(undefined);
    const [filteredTrips, setFilteredTrips] = useState<TripType[]>([]);

    const fetchTrips = async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Retirar depois
            const data = await readTrips();
            setTrips(data);
            setFilteredTrips(data);
        } catch (error) {
            console.error("Erro ao buscar viagens: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = (id: number | undefined) => {
        setTripToDelete(id);
        setShowModal(true);
    }

    const confirmDelete = async () => {
        if (tripToDelete) {
            await deleteTrip(tripToDelete);
            setShowModal(false);
            setTimeout(() => {
                fetchTrips();
            }, 100);
        }
    }

    const handleSearch = async (query: string) => { // Implementar busca no backend depois e remover lógica de filtro aqui
        const lowerQuery = query.toLowerCase();
        setIsLoading(true);
        const result = trips.filter(trip =>
            trip.origin.toLowerCase().includes(lowerQuery) ||
            trip.destination.toLowerCase().includes(lowerQuery)
        );
        await new Promise(resolve => setTimeout(resolve, 2000)); // Retirar depois
        setFilteredTrips(result);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <div>
            <SearchInput type="viagens" onSearch={handleSearch} />
            {isAdmin &&<button type="button"
                className="text-brand-text bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mt-5 w-auto h-min"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(`/admin/trips/new`);
                }}
            >
                Nova Viagem
            </button>}
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                    {filteredTrips.map((trip) => (
                        <div key={trip.id}>
                            <Link href={isAdmin ? (`/admin/trips/${trip.id}`) : (`/trips/${trip.id}`)} className="bg-neutral-primary-soft block w-full h-full p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium mt-5 flex flex-col">
                                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{trip.origin} - {trip.destination}</h5>
                                <ul>
                                    <li className="">Origem: {trip.origin}</li>
                                    <li>Destino: {trip.destination}</li>
                                    <li>Horário de partida: {new Date(trip.departureTime).toLocaleString()}</li>
                                    <li>Tipo: {trip.type}</li>
                                </ul>
                                {isAdmin && (
                                <div className="mt-auto">
                                    <button type="button"
                                        className="text-brand-text bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mt-5 w-min"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            router.push(`/admin/trips/${trip.id}/edit`);
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleDelete(trip.id);
                                        }}
                                        className="text-white bg-action-delete box-border border border-transparent hover:bg-action-delete-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mt-5 w-min ml-2"
                                    >
                                        Excluir
                                    </button>
                                </div>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-neutral-primary p-6 rounded-base border border-default shadow-xl w-full max-w-sm mx-4">
                        <h3 className="text-xl font-bold text-heading mb-4">Confirmar exclusão?</h3>
                        <p className="text-body mb-6">Esta ação não pode ser desfeita. A viagem será removida permanentemente.</p>
                        
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm font-medium text-heading hover:bg-neutral-secondary-medium rounded-base transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-base shadow-xs transition-colors"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TripsGrid;