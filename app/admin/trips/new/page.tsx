'use client';

import TripForm from "@/components/TripForm";
import { createTrip } from "@/services/trips";
import { useRouter } from "next/navigation";

const NewTrip = () => {
    const router = useRouter()

    return (
        <div className="p-3">
            <h1 className="mb-5">Criar nova viagem</h1>
            <TripForm onSubmit={async (data) => {
                await createTrip(data);
                router.push("/admin/trips");
            }} />
        </div>
    );
};

export default NewTrip;