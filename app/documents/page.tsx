'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentType } from "@/types/document";
import { readDocuments } from "@/services/documents";
import LoadingSpinner from "@/components/LoadingSpinner";

const STANDARD_DOCUMENTS = [
    "RG ou CPF",
    "Comprovante de residência",
    "Declaração de vínculo"
];

const Documents = () => {
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const currentUserId = 1; // Simulando o ID do usuário logado

    const fetchDocuments = async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Retirar depois
            const data = await readDocuments(currentUserId);
            const mergedDocs = STANDARD_DOCUMENTS.map((stdType) => {
                const uploadedDoc = data.find((doc: DocumentType) => doc.type === stdType);
                
                if (uploadedDoc) {
                    return uploadedDoc; // Se achou, usa o que veio do banco
                } else {
                    // Se não achou, cria um "Documento Fantasma" para preencher a tela
                    return {
                        id: `missing-${stdType}`, // ID falso só para o React (key)
                        type: stdType,
                        fileName: "Nenhum arquivo selecionado",
                        status: "NÃO ENVIADO", // Novo status exclusivo do frontend
                        filePath: null
                    };
                }
            });

            setDocuments(mergedDocs);
        } catch (error) {
            console.error("Erro ao buscar documentos: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const renderStatus = (status: string) => {
        const currentStatus = status.toUpperCase();

        switch (currentStatus) {
            case "APROVADO":
                return <span className="text-status-approved font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Aprovado
                </span>;
            case "PENDENTE":
                return <span className="text-status-pending font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Em Análise
                </span>;
            case "REJEITADO":
                return <span className="text-status-rejected font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Rejeitado
                </span>;
            case "NÃO ENVIADO":
                return (
                <span className="text-body font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Pendente de Envio
                </span>
            );
        default:
            return <span className="text-body font-medium">{status || "Desconhecido"}</span>;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-heading">Meus Documentos</h1>
                    <p className="text-body mt-1">Gerencie os comprovantes necessários para o seu passe livre.</p>
                </div>
                <button
                    onClick={() => router.push('/documents/new')}
                    className="text-brand-text bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-sm px-5 py-2.5 transition-colors"
                >
                    Anexar Documento
                </button>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {documents.map((doc) => (
                        <div key={doc.id} className="bg-neutral-primary-soft p-5 border border-default rounded-base shadow-xs flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-lg font-semibold text-heading truncate pr-2">
                                    {doc.type}
                                </h2>
                                {renderStatus(doc.status)}
                            </div>
                            
                            <div className="mt-auto pt-4 border-t border-default flex justify-between items-center">
                                {doc.status === "NÃO ENVIADO" ? (
                                    <button
                                        onClick={() => router.push(`/documents/new?type=${doc.type}`)}
                                        className="w-full text-center text-sm font-medium text-brand-text bg-brand hover:bg-brand-strong rounded-base py-2 transition-colors"
                                    >
                                        Anexar Arquivo
                                    </button>
                                ) : (
                                    <>
                                        <a href={doc.filePath} target="_blank" rel="noopener noreferrer" className="text-sm text-body hover:text-heading hover:underline">
                                            Ver arquivo ({doc.fileName})
                                        </a>
                                        
                                        {doc.status?.toUpperCase() === "REJEITADO" && (
                                            <button
                                            onClick={() => router.push(`/documents/${doc.id}/edit`)} className="text-sm font-medium text-status-rejected hover:text-red-400">
                                                Reenviar
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Documents;