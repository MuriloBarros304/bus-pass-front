'use client';

import SearchInput from "../../components/SearchInput";
import { TripType } from "../../types/trip";
import { createTrip, readTrips, updateTrip } from "../../services/trips";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "../../components/LoadingSpinner";

function Trips() {
    const [trips, setTrips] = useState<TripType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTrips = async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula um delay de 1 segundo
            const data = await readTrips();
            setTrips(data);
        } catch (error) {
            console.error("Erro ao buscar viagens:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    

    return (
        <div>
            <h1 className="mb-5">Viagens</h1>
            <SearchInput type="viagens" />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trips.map((trip) => (
                        <div key={trip.id}>
                            <Link href={`/trips/${trip.id}`} className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium mt-5">
                                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{trip.origem} - {trip.destino}</h5>
                                <ul>
                                    <li className="">Origem: {trip.origem}</li>
                                    <li>Destino: {trip.destino}</li>
                                    <li>Horário de partida: {trip.horarioPartida}</li>
                                    <li>Tipo: {trip.tipo}</li>
                                </ul>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Trips;