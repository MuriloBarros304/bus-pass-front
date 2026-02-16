'use client';

import { getTripById } from "@/services/trips";
import { TripType } from "@/types/trip";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TripDetails = () => {
    const pageParams = useParams();
    const { id } = pageParams;
    const [trip, setTrip] = useState<TripType | null>(null);

    const fetchTrip = async () => {
        try {
            const data = await getTripById(Number(id));
            setTrip(data);
        } catch (error) {
            console.error("Erro ao buscar detalhes da viagem:", error);
        }
    };
    
    useEffect(() => {
        fetchTrip();
    }, [id]);

    return (
        <div>
            <div className="p-5 border border-default rounded-base list-disc max-w-lg">
                    <h1>Detalhes da Viagem</h1>
                    <ul>
                        <li>Origem: {trip?.origin}</li>
                        <li>Destino: {trip?.destination}</li>
                        <li>Hora de Saída: {trip?.departureTime}</li>
                        <li>Tipo: {trip?.type}</li>
                    </ul>
                </div>
                <div className="mt-5">
                    <p>{trip?.details}</p>
            </div>
        </div>
    );
}

export default TripDetails;