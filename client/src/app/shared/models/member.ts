import { Photo } from "./photo";

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    name: string;
    created: Date;
    lastActive: Date;
    country: string;
    aboutMe: string;
    badge: string;
    hokmScore: number;
    shelemScore: number;
    gamesWon: number;
    gamesLost: number;
    gamesLeft: number;
    tournomenstWon: number;
    views: number;
    status: string;
    photos: Photo[];
}