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

export interface IGetWithdrawRequest {
    size: number;
    offset: number;
    search?: string;
    startTime?: string;
    endTime?: string;
    status?: string
    sortBy?: string
    sortOrder?: string
}

export interface IOverViewStatistic {
    totalRevenue: number;
    totalProduct: number;
    totalOrder: number;

}

export interface IHotProducts {
    title: string;
    price: number;
    quantityPurchased: number;
    userId: string;
    id: string;
    image: string;
    revenue: number;
}