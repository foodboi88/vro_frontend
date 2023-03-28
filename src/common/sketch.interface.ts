import { IArchitecture, IStyle, ITool } from "./tool.interface";

export interface IReqGetLatestSketchs {
    size: number;
    offset: number;
}

export interface ISketch {
    title: string;
    content: string;
    price: 0;
    size: string;
    designToolId: string;
    collectionId: string;
}

export interface ICurrentSearchValue {
    text: string;
    tool: ITool[];
    architecture: IArchitecture[];
    style: IStyle[];
}
