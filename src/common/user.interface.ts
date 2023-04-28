export interface IUser {
    id: string;
    name: string;
    role: string;
}

export interface IAuthor {
    name?: string;
    phone?: string;
    address?: string;
    totalRating?: number;
    totalProduct?: number;
    createdAt: string;
}
