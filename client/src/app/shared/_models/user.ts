export interface UserToken {
    username: string;
    token: string;
    photoUrl: string;
}

export interface UserUpdate {
    id: number;
    name: string;
    aboutMe: string;
    country: string;
}