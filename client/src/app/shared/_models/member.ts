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
    gameWon: number;
    gameLost: number;
    gameLeft: number;
    views: number;
    tournomentWon: number;
    gamesAbandoned: number;
    status: string;
    photos: Photo[];
}