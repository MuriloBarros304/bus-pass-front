'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import LoadingSpinner from "./LoadingSpinner";
import { TripType } from "@/types/trip";
import { readTrips } from "@/services/trips";
import { useRouter } from "next/navigation";

interface TripsGridProps {
    isAdmin?: boolean;
}

const TripsGrid = ({ isAdmin }: TripsGridProps) => {
    const [trips, setTrips] = useState<TripType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchTrips = async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Retirar depois
            const data = await readTrips();
            setTrips(data);
        } catch (error) {
            console.error("Erro ao buscar viagens: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <div>
            <SearchInput type="viagens" />
            {isAdmin &&<button type="button"
                className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mt-5 w-auto h-min"
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
                    {trips.map((trip) => (
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
                                <button type="button"
                                    className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mt-5 w-min"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        router.push(`/admin/trips/${trip.id}/edit`);
                                    }}
                                >
                                    Editar
                                </button>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TripsGrid;