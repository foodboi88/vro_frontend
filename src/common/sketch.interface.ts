import { IArchitecture, IStyle, ITool } from "./tool.interface";

export interface IReqGetLatestSketchs {
    size: number;
    offset: number;
}
export interface IReqProductsFiles {
    sketchId: string;
    token: string;
}
export interface ISketch {
    title: string;
    price: number;
    views: number;
    likes: number;
    quantityPurchased: number;
    id: string;
    images: string[];
}

export interface ICurrentSearchValue {
    name: string;
    tool: string[];
    architecture: string[];
    style: string[];
    size?: number;
    offset?: number;
}
export interface IInFoSketch {
    title: string;
    content: string;
    price: number;
    views: number;
    likes: number;
    quantityPurchased: number;
    userId: string;
    collectionId: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}
export interface IImagesSketch {
    filePath: string;
    id: string;
    isMain: boolean;
}
export interface IDetailSketch {
    designStyles: IStyle[];
    designTools: ITool[];
    images: IImagesSketch[];
    info: IInFoSketch;
    typeOfArchitectures: IArchitecture[];
    star: number | null;
}
