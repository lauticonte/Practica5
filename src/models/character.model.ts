export interface Character {
    name?: string;
    id?: number;
    status?: string;
    image?: string;
    species?: string;
    type?: string;
    gender?: string;
    origin?: Origin;
    location?: Location;
}

interface Origin {
    name?: string;
}

interface Location {
    name?: string;
}