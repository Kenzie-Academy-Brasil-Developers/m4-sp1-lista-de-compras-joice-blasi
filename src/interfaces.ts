export interface IPurchaseList {
    listName: string,
    data: IProducts[]
};

export interface IProducts {
    name: string,
    quantity: string,
};

export interface IPurchaseListId extends IPurchaseList {
    id: number
};

export type PurchaseListRequiredKeys = 'listName' | 'data';

export type DataListRequiredKeys = 'name' | 'quantity';