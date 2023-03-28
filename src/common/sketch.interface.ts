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
