'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import LoadingSpinner from "./LoadingSpinner";
import { TripType } from "@/types/trip";
import { readTrips } from "@/services/trips";

interface TripsGridProps {
    isAdmin?: boolean;
}

const TripsGrid = ({ isAdmin }: TripsGridProps) => {
    const [trips, setTrips] = useState<TripType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {trips.map((trip) => (
                        <div key={trip.id}>
                            <Link href={isAdmin ? (`/admin/trips/${trip.id}`) : (`/trips/${trip.id}`)} className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium mt-5">
                                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{trip.origin} - {trip.destination}</h5>
                                <ul>
                                    <li className="">Origem: {trip.origin}</li>
                                    <li>Destino: {trip.destination}</li>
                                    <li>Horário de partida: {new Date(trip.departureTime).toLocaleString()}</li>
                                    <li>Tipo: {trip.type}</li>
                                </ul>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TripsGrid;