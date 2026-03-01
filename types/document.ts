import { DocumentStatus } from "./documentStatus";

export type DocumentType = {
    id?: number;
    userId: number;
    fileName: string;
    filePath: string;
    status: DocumentStatus;
};