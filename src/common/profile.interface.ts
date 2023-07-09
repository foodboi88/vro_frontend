export interface IBusiness {
    id: string;
    name: string;
    address: string;
}

export interface IReqFormArchitect {
    sellerType: string,
    identityCardNumber: string,
    identityCardDate: string,
    identityCardPlace: string,
    vatCode: string,
    bankAccountNumber: string,
    bankName: string,
    bankBranch: string,
    additionalProp1: {}

}