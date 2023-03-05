/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IGetReservatedRooms {
    arivalDay: string;
    depatureDay: string;
    roomtypeIds: any;
}

//Response
export interface ResReservatedRooms {
    day: string;
    roomTypesCount: unknown;
}

export interface ResRoom {
    guid: string;
    parentGuid: string;
    so: string;
    loai: string;
    tinhTrang: number | null;
    trangThai: number;
    donGia: number;
    dienTich: number;
    dacDiem: string;
    ghiChu: string;
    nhom: number;
    miniBar: string;
    nguoiDung: number;
    capDo: number;
    tgtn: string;
    backView: boolean;
    sizeView: boolean;
    frontView: boolean;
    donViTienTe: number;
    floor: number;
    block: string;
    sections: string;
    connectingSuite: string;
    inspected: number;
    cleanDirty: number;
    vacantOcc: number;
    seq: number;
    hotelGuid: string;
    statusRec: number;
}

export interface ResRoomType {
    guid: string;
    parentGuid: string;
    ma: string;
    ten: string;
    ghiChu: string;
    donGia: number;
    hotelGuid: string;
    statusRec: number;
}
export interface SelectedGuestProfile {
    guid: string;
    roomName: string | null;
    roomType: string ;
    arrivalDate: string;
    departureDate: string;
}
export interface SelectedRoomForAssign {
    guid: string;
    hotelGuid: string;
    roomName: string;
    roomType: string;
}

export interface ResGuestProfiles {
    id: number;
    guestId: string;
    arrivalDate: string;
    departureDate: string;
    rate: number;
    rateCode: string;
    roomType: string;
    fixedRate: boolean;
    comments: string;
    flightNo: string;
    printRate: boolean;
    status: number;
    flagType: number;
    cutOfDate: string;
    arrivalPickUp: boolean;
    departurePickUp: boolean;
    confirmed: boolean;
    resSource: string;
    resMarket: string;
    packageCodes: string;
    specialsCodes: string;
    isNet: boolean;
    guid: string;
    parentGuid: string;
    hotelId: number;
    hotelGuid: string;
    isNoBkf: boolean;
    resChanel: string;
    carPickUp: string;
    carPickUpTime: string;
    companyAgentGuid: string;
    dataForeservation: DataForeservation;
    guestName: string;
    firstName: string;
    titlesGuid: string;
    adress: string;
    phone: string;
    nationalityGuid: string;
    agentGuid: string;
    companyGuid: string;
    passport: string;
    roomName: string;
    mainGuest: string;
}

export interface DataForeservation {
    reservationDate: string;
    bookedBy: string;
    ccno: string;
    ccexpDate: string;
    ccmadeBy: number;
    comments: string;
    status: number;
    flagType: number;
    bookByPhone: string;
    bookByFax: string;
    bookByEmail: string;
    guid: string;
    hotelGuid: string;
    confirmNum: number;
    groupName: string;
}
export interface ReqGuestProfilesSearch {
    hotelGuid: string;
    phone: string;
    passport: string;
    firstName: string;
    guestName: string;
}
export interface ResGuestProfilesSearch {
    guid: string;
    parentGuid: string;
    guestName: string;
    firstName: string;
    titlesGuid: string;
    adress: string;
    phone: string;
    nationalityGuid: string;
    agentGuid: string;
    companyGuid: string;
    comments: string;
    passport: string;
}
export interface IRoomType {
    dmucFophong: string | null,
    donGia: number,
    ghiChu: string,
    guid: string,
    hotelGuid: string,
    ma: string
    maxPerson: number,
    parentGuid: string,
    room: ResRoom[],
    statusRec: number,
    ten: string,
}

export interface IUserRoomDetail {
    hotelGuid: string, 
    roomTypeGuid: string,
    arrivalDate: string,
    departureDate: string
}
