'use client';

import TripForm from "@/components/TripForm";
import { getTripById, updateTrip } from "@/services/trips";
import { TripType } from "@/types/trip";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditTrip = () => {
    const params = useParams<{ id: string }>();
    const [tripData, setTripData] = useState<TripType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadTrip = async () => {
            try {
                const data = await getTripById(Number(params.id));
                setTripData(data);
            } catch (error) {
                console.error("Erro ao carregar viagem", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadTrip();
    }, [params.id]);

    if (isLoading) return <p className="text-white p-5">Carregando dados da viagem...</p>;
    
    return (
        <div className="p-3">
            <h1 className="mb-5">Editar viagem</h1>
            <TripForm
                trip={tripData}
                onSubmit={async (updatedData) => {
                    await updateTrip(Number(params.id), updatedData);
                    router.refresh();
                    router.push("/admin/trips");
                }} 
            />
        </div>
    );
};

export default EditTrip;