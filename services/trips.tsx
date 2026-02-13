import { TripType } from "@/types/trip";
import api from "./api";

// CRUD Viagens

// Create
export async function createTrip(trip: TripType) {
    try {
        const response = await api.post("/viagens", trip);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar viagem:", error);
        throw error;
    }
}

// Read
export async function readTrips() {
    try {
        const response = await api.get("/viagens");
        return response.data;
    } catch (error) {
        console.error("Erro ao ler viagens:", error);
        throw error;
    }
}

// Update
export async function updateTrip(id: number, trip: TripType) {
    try {
        const response = await api.put(`/viagens/${id}`, trip);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar viagem:", error);
        throw error;
    }
}

// Delete
export async function deleteTrip(id: number) {
    try {
        const response = await api.delete(`/viagens/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar viagem:", error);
        throw error;
    }
}
