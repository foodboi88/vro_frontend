export interface IFacilities {
    name: string,
    address: string,
    description: string,
    id: string,
}
export interface IFacilitiesList {
    colleges: IFacilities[],
    universities: IFacilities[],
}