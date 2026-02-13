export type TripType = {
    id?: number;
    origem: string;
    destino: string;
    horarioPartida: string; // AAAA-MM-DDTHH:mm:ss
    tipo: string;
};