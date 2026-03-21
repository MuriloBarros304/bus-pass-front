'use client';

import { TripType } from "@/types/trip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormErrors } from "@/types/form";

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
    const [errors, setErrors] = useState<FormErrors>({});
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
        const newErrors: FormErrors = {};

        if (!origin) {
            newErrors.origin = "Por favor, informe a origem.";
        }
        if (!destination) {
            newErrors.destination = "Por favor, informe o destino.";
        }
        if (!departureTime) {
            newErrors.departureTime = "Por favor, informe o horário de saída.";
        }
        if (!type) {
            newErrors.type = "Por favor, selecione o tipo.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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
            <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <label htmlFor="origin" className="block mb-2.5 text-sm font-medium text-heading">Origem</label>
                    <input
                    type="text"
                    id="origin"
                    className={`bg-neutral-secondary-medium border text-heading text-sm rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body ${
                        errors.origin
                        ? 'text-danger border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-default-medium focus:border-brand focus:ring-brand'
                    }`}
                    value={ origin }
                    onChange={(e) => setOrigin(e.target.value)}
                    />
                    {errors.origin && <p className="text-danger text-sm">{errors.origin}</p>}
                </div>
                <div>
                    <label htmlFor="destination" className="block mb-2.5 text-sm font-medium text-heading">Destino</label>
                    <input
                    type="text"
                    id="destination"
                    className={`bg-neutral-secondary-medium border text-heading text-sm rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body ${
                        errors.destination
                        ? 'text-danger border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-default-medium focus:border-brand focus:ring-brand'
                    }`}
                    value={ destination } 
                    onChange={(e) => setDestination(e.target.value)}/>
                    {errors.destination && <p className="text-danger text-sm">{errors.destination}</p>}
                </div>
                <div>
                    <label htmlFor="departure_time" className="block mb-2.5 text-sm font-medium text-heading">Horário de saída</label>
                    <input
                    type="datetime-local"
                    id="departure_time"
                    className={`bg-neutral-secondary-medium border text-heading text-sm rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body ${
                        errors.origin
                        ? 'text-danger border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-default-medium focus:border-brand focus:ring-brand'
                    }`}
                    value={ departureTime }
                    onChange={(e) => setDepartureTime(e.target.value)}/>
                    {errors.departureTime && <p className="text-danger text-sm">{errors.departureTime}</p>}
                </div>
                <div>
                    <label htmlFor="type" className="block mb-2.5 text-sm font-medium text-heading">Tipo</label>
                    <div>
                        <select
                        name="type"
                        id="type"
                        className={`bg-neutral-secondary-medium border text-heading text-sm rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body ${
                        errors.origin
                        ? 'text-danger border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-default-medium focus:border-brand focus:ring-brand'
                    }`}
                        value={ type }
                        onChange={(e) => setType(e.target.value)}>
                            <option value="">--Selecione o tipo--</option>
                            <option value="EMPRESA">Empresa</option>
                            <option value="PREFEITURA">Prefeitura</option>
                        </select>
                        {errors.type && <p className="text-danger text-sm ml-2">{errors.type}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="details" className="block mb-2.5 text-sm font-medium text-heading">Detalhes</label>
                    <textarea id="details" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" value={ details } onChange={(e) => setDetails(e.target.value)}/>
                    {errors.details && <p className="text-danger text-sm">{errors.details}</p>}
                </div>
            </div>
            <button className="text-brand-text bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            type="submit"
            >{trip ? "Atualizar" : "Criar"}</button>
        </form>
    );
}

export default TripForm;