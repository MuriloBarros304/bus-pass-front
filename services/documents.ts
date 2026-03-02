import { DocumentType } from "@/types/document";
import api from "./api";

// CRUD Documentos

// Create
export async function createDocument(document: DocumentType, userId: number) {
    try {
        const response = await api.post(`/documents/user/${userId}`, document);
        return response.data;
    } catch (error) {
        console.log("Erro ao anexar documento:", error);
        throw error;
    }
}

// Read
export async function readDocuments(userId: number) {
    try {
        const response = await api.get(`/documents/user/${userId}`);
        return response.data;
    } catch (error) {
        console.log("Erro ao ler documentos deste usuário", error);
        throw error;
    }
}

// Update
export async function updateDocument(document: DocumentType, documentId: number) {
    try {
        const response = await api.put(`/documents/${documentId}`, document);
        return response.data;
    } catch (error) {
        console.log("Erro ao atualizar documento para este usuário:", error);
        throw error;
    }
}

// Delete
export async function deleteDocument(documentId: number) {
    try {
        const response = await api.delete(`/documents/${documentId}`);
        return response.data;
    } catch (error) {
        console.log("Erro ao deletar documento:", error);
        throw error;
    }
}

export async function approveDocument(documentId: number) {
    try {
        const response = await api.put(`/documents/${documentId}/approve`);
        return response.data;
    } catch (error) {
        console.log("Erro ao aprovar documento:", error);
        throw error;
    }
}

export async function rejectDocument(documentId: number) {
    try {
        const response = await api.put(`/documents/${documentId}/reject`);
        return response.data;
    } catch (error) {
        console.log("Erro ao reprovar documento:", error);
        throw error;
    }
}