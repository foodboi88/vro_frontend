export interface IRates {
    TotalStar: number,
    RateUser: IRateUser[],
}
export interface IRateUser {
    userId: string,
    productId: string,
    rate: number,
    description: string,
    nameUser: string,
    createdAt: Date,
    updatedAt: Date,
    id: string,
}
