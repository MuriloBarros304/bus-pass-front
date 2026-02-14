export type TripType = {
    id?: number;
    origin: string;
    destination: string;
    departureTime: string; // AAAA-MM-DDTHH:mm:ss
    type: string;
    details: string;
};