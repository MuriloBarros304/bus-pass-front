'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/components/BackButton";
import { uploadDocument, updateDocument } from "@/services/documents";
import { DocumentType } from "@/types/document";
import LoadingSpinner from "./LoadingSpinner";

interface DocumentFormProps {
    document?: DocumentType;
}

const STANDARD_DOCUMENTS = [
    "RG ou CPF",
    "Comprovante de residência",
    "Declaração de vínculo",
    "Outros"
];

const DocumentForm = ({document}: DocumentFormProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [documentType, setDocumentType] = useState<string>(document?.type || "");
    const [file, setFile] = useState<File | null>(null);
    const [existingFileName, setExistingFileName] = useState<string | null>(document?.fileName || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Pega o tipo de documento da URL (se existir)
    useEffect(() => {
        const typeFromUrl = searchParams.get("type");
        if (typeFromUrl && STANDARD_DOCUMENTS.includes(typeFromUrl)) {
            setDocumentType(typeFromUrl);
        }
    }, [searchParams]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            // Validação de Tamanho (Máximo 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError("O arquivo é muito grande. O limite máximo é de 5MB.");
                setFile(null);
                return;
            }
            // Validação de Tipo
            if (!['application/pdf', 'image/jpeg', 'image/png'].includes(selectedFile.type)) {
                setError("Formato inválido. Aceitamos apenas PDF, JPG ou PNG.");
                setFile(null);
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!file || !documentType) {
            setError("Por favor, selecione um tipo de documento e anexe um arquivo.");
            return;
        }

        try {
            setIsLoading(true);
            const currentUserId = 1; // Fixo por enquanto
            
            if (document?.id) {
                if (!file) {
                    setError("Por favor, selecione o novo arquivo para reenvio.");
                    return;
                }
                await updateDocument(document);
            } else {
                // Fluxo de CRIAÇÃO
                await uploadDocument(file, documentType, currentUserId);
            }
            
            router.push('/documents');
            router.refresh(); 
        } catch (err) {
            console.error("Erro no upload:", err);
            setError("Ocorreu um erro ao enviar o documento. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <BackButton />
            {isLoading ? ( <LoadingSpinner /> ) : (
                <div>
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-heading">{document?.id ? 'Reenviar Documento' : 'Anexar Documento'}</h1>
                        <p className="text-body mt-1">Envie seus comprovantes em formato PDF ou Imagem.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-neutral-primary-soft p-6 md:p-8 border border-default rounded-base shadow-xl">
                        
                        {/* Seleção do Tipo */}
                        <div className="mb-6">
                            <label htmlFor="type" className="block text-sm font-medium text-heading mb-2">
                                Tipo de Documento
                            </label>
                            <select
                                id="type"
                                value={documentType}
                                onChange={(e) => setDocumentType(e.target.value)}
                                className="w-full p-3 bg-neutral-secondary-medium border border-neutral-secondary-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs outline-none"
                            >
                                <option value="" disabled>Selecione o documento...</option>
                                {STANDARD_DOCUMENTS.map((doc) => (
                                    <option key={doc} value={doc}>{doc}</option>
                                ))}
                            </select>
                        </div>

                        {/* Área de Upload (Drag & Drop visual) */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-heading mb-2">
                                Arquivo
                            </label>
                            <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-base cursor-pointer transition-colors ${file ? 'border-brand bg-brand/5' : 'border-neutral-secondary-medium hover:border-brand hover:bg-neutral-secondary-low'}`}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                    <svg className={`w-10 h-10 mb-3 ${file ? 'text-brand' : 'text-body'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                    {file ? (
                                            <>
                                                <p className="mb-1 text-sm text-heading font-semibold">{file.name}</p>
                                                <p className="text-xs text-body">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </>
                                        ) : existingFileName ? (
                                            <>
                                                <p className="mb-1 text-sm text-heading font-semibold">Arquivo atual: {existingFileName}</p>
                                                <p className="text-xs text-body">Clique ou arraste um novo arquivo para substituir</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="mb-1 text-sm text-body"><span className="font-semibold text-heading">Clique para selecionar</span> ou arraste o arquivo</p>
                                                <p className="text-xs text-body">PDF, PNG ou JPG (Max. 5MB)</p>
                                            </>
                                        )}
                                </div>
                                {/* Input invisível que faz o trabalho pesado */}
                                <input id="dropzone-file" type="file" className="hidden" accept=".pdf, image/jpeg, image/png" onChange={handleFileChange} />
                            </label>
                        </div>

                        {/* Exibição de Erros */}
                        {error && (
                            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-base text-status-rejected text-sm flex items-start gap-2">
                                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Botão Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full text-brand-text bg-brand hover:bg-brand-strong disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-brand-medium shadow-xs font-bold rounded-base text-sm px-5 py-3 transition-colors flex justify-center items-center"
                        >
                            {document?.id ? 'Enviar Novo Arquivo' : 'Enviar Documento'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default DocumentForm;