export interface IRates {
    rateProduct: number,
    items: IRateUser[],
}
export interface IRateUser {
    productId: string,
    rate: number,
    description: string,
    createdAt: string,
    updatedAt: string,
    id: string,
    userName: string
}


