'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DocumentForm from "@/components/DocumentForm";
import { getDocumentById } from "@/services/documents";
import { DocumentType } from "@/types/document";
import LoadingSpinner from "@/components/LoadingSpinner";

const EditDocument = () => {
    const params = useParams<{ id: string }>();
    const [documentData, setDocumentData] = useState<DocumentType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDocument = async () => {
            try {
                const data = await getDocumentById(Number(params.id));
                setDocumentData(data);
            } catch (error) {
                console.error("Erro ao carregar o documento:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadDocument();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return <DocumentForm document={documentData} />;
}

export default EditDocument;