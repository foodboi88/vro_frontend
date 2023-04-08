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
    _id: string;
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
