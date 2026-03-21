export interface FormErrors {
    global?: string; // Para erros gerais, ex: "Servidor fora do ar"
    [key: string]: string | undefined;
}