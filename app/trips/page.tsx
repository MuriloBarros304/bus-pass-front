'use client';

import SearchInput from "../../components/SearchInput";
import { TripType } from "../../types/trip";
import { createTrip, readTrips, updateTrip } from "../../services/trips";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "../../components/LoadingSpinner";
import TripsGrid from "@/components/TripsGrid";

const Trips = () => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchTrips = async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula um delay de 1 segundo
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
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <TripsGrid isAdmin={false}></TripsGrid>
            )}
        </div>
    );
}

export default Trips;