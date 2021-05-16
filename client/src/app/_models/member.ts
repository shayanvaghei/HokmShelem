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
    hokmScore: string;
    shelemScore: string;
    gameWon: string;
    gameLost: string;
    gameLeft: string;
    views: string;
    tournomentWon: string;
    gamesAbandoned: string;
    status: string;
    photos: Photo[];
}