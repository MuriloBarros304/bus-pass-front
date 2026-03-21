'use client';

import TripsGrid from "@/components/TripsGrid";

const Trips = () => {
    return (
        <div>
            <h1 className="mb-5">Viagens</h1>
            {<TripsGrid isAdmin={false}></TripsGrid>}
        </div>
    );
}

export default Trips;