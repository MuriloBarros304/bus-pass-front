'use client';

import TripDetails from "@/components/TripDetails";
import TripForm from "@/components/TripForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminTripPage = () => {
    const router = useRouter()

    return (
        <div className="p-3">
            <TripDetails></TripDetails>
            <button type="button"
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            onClick={ () => {router.push("/edit")} }
            >Editar</button>
            <button type="button" className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Excluir</button>
        </div>
    );
};

export default AdminTripPage;