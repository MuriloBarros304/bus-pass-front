import { DocumentType } from "@/types/document";
import api from "./api";

// CRUD Documentos

// Create
export async function createDocument(document: DocumentType, userId: number) {
    try {
        const response = await api.post(`/documents/users/${userId}`, document);
        return response.data;
    } catch (error) {
        console.log("Erro ao anexar documento:", error);
        throw error;
    }
}

// Read