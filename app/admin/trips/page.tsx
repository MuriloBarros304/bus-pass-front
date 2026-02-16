'use client';

import TripsGrid from "@/components/TripsGrid";

const AdminTrips = () => {
    return (
        <div>
            <h1 className="mb-5">Administrar Viagens</h1>
            <TripsGrid isAdmin={true}></TripsGrid>
        </div>
    )
}

export default AdminTrips;