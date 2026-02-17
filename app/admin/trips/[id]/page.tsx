'use client';

import TripDetails from "@/components/TripDetails";
import { useParams, useRouter } from "next/navigation";

const AdminTripPage = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();

    return (
        <div className="p-3">
            <h1>Detalhes da Viagem</h1>
            <TripDetails></TripDetails>
            <button type="button"
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mt-5"
            onClick={ () => {router.push(`/admin/trips/${params.id}/edit`)} }
            >Editar</button>
            <button type="button" className="text-white bg-status-rejected box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mt-5">Excluir</button>
        </div>
    );
};

export default AdminTripPage;