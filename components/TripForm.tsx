'use client';

import { TripType } from "@/types/trip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TripFormProps {
    trip?: TripType;
    onSubmit?: (trip: TripType) => void;
}

const TripForm = ({trip, onSubmit}: TripFormProps) => {
    const [id] = useState<number | undefined>(trip?.id);
    const [origin, setOrigin] = useState(trip?.origin || "");
    const [destination, setDestination] = useState(trip?.destination || "");
    const [departureTime, setDepartureTime] = useState(trip?.departureTime || "");
    const [type, setType] = useState(trip?.type || "");
    const [details, setDetails] = useState(trip?.details || "");
    const router = useRouter();

    useEffect(() => {
        if (trip) {
            setOrigin(trip.origin);
            setDestination(trip.destination);
            setDepartureTime(trip.departureTime);
            setType(trip.type);
            setDetails(trip.details);
        }
    }, [trip]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSubmit) {
            const tripData: TripType = {
                id,
                origin,
                destination,
                departureTime,
                type,
                details
            };
            onSubmit(tripData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2.5 text-sm font-medium text-heading">Origem</label>
                    <input type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required value={ origin } onChange={(e) => setOrigin(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2.5 text-sm font-medium text-heading">Destino</label>
                    <input type="text" id="last_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required value={ destination } onChange={(e) => setDestination(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="departureTime" className="block mb-2.5 text-sm font-medium text-heading">Horário de saída</label>
                    <input type="datetime-local" id="departureTime" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required value={ departureTime } onChange={(e) => setDepartureTime(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="type" className="block mb-2.5 text-sm font-medium text-heading">Tipo</label>
                    <div className="flex items-center">
                        <select name="type" id="type" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" value={ type } onChange={(e) => setType(e.target.value)}>
                            <option value="">--Selecione o tipo--</option>
                            <option value="EMPRESA">Empresa</option>
                            <option value="PREFEITURA">Prefeitura</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="details" className="block mb-2.5 text-sm font-medium text-heading">Detalhes</label>
                    <textarea id="details" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required value={ details } onChange={(e) => setDetails(e.target.value)}/>
                </div>
            </div>
            <button className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            onClick={ () => {router.push("/admin/trips")} }
            type="submit"
            >{trip ? "Atualizar" : "Criar"}</button>
        </form>
    );
}

export default TripForm;