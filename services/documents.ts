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
export async function updateDocument(document: DocumentType) {
    try {
        const response = await api.put(`/documents/${document.id}`, document);
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

// Buscar documento por ID
export async function getDocumentById(documentId: number) {
    try {
        const response = await api.get(`/documents/${documentId}`);
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar documento por ID:", error);
        throw error;
    }
}

// Aprovar documento
export async function approveDocument(documentId: number) {
    try {
        const response = await api.put(`/documents/${documentId}/approve`);
        return response.data;
    } catch (error) {
        console.log("Erro ao aprovar documento:", error);
        throw error;
    }
}

// Reprovar documento
export async function rejectDocument(documentId: number) {
    try {
        const response = await api.put(`/documents/${documentId}/reject`);
        return response.data;
    } catch (error) {
        console.log("Erro ao reprovar documento:", error);
        throw error;
    }
}

// Subir documento na nuvem (Ainda não implementado no backend)
// export async function uploadDocument(file: File, type: string, userId: number) {
//     const formData = new FormData();
//     formData.append("file", file); // O arquivo físico (PDF, JPG)
//     formData.append("type", type); // RG, Comprovante, etc.

//     try {
//         const response = await api.post(`/documents/user/${userId}/upload`, formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data", // Avisa o Spring Boot que tá chegando um arquivo pesado
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.log("Erro ao fazer upload do documento:", error);
//         throw error;
//     }
// }

// Simulação de upload (sem backend)
export async function uploadDocument(file: File, type: string, userId: number) {
    console.log(`Simulando upload do arquivo: ${file.name} (Tipo: ${type})`);

    // Retorna uma Promise que resolve após 2 segundos (simulando a rede)
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Upload simulado com sucesso!");
            resolve({
                id: Math.floor(Math.random() * 1000), // ID falso
                fileName: file.name,
                type: type,
                status: "PENDENTE",
                filePath: "https://sitefalso.com/arquivo.pdf" // Link falso
            });
        }, 2000); // 2 segundos de espera
    });
}