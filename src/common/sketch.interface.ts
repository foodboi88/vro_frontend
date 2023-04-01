import { IArchitecture, IStyle, ITool } from "./tool.interface";

export interface IReqGetLatestSketchs {
    size: number;
    offset: number;
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
    text: string;
    tool: string[];
    architecture: string[];
    style: string[];
}
