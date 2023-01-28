import { request, Request, Response } from 'express';
import { IProducts, IPurchaseListId, DataListRequiredKeys } from './interfaces';
import { shoppingLists, idsList } from './database';

export const createPurchaseList = (request: Request, response: Response): Response => {
    const count = shoppingLists.length + 1;
    const newList: IPurchaseListId = {
        ...request.body,
        id: count
    }
    shoppingLists.push(newList);
    idsList.push(count);
    return response.status(201).json(newList);
}

export const readAllPurchaseList = (request: Request, response: Response): Response => {
    return response.status(200).json(shoppingLists);
}

export const readPurchaseListId = (request: Request, response: Response): Response => {
    const idParam = parseInt(request.params.id);
    const idExists = idsList.includes(idParam);
    if (idExists) {
        const listIdParam = shoppingLists.find(list => list.id === idParam);
        return response.status(200).json(listIdParam);
    }
    return response.status(404).json({ message: `List with id ${idParam} does not exist` });
}

export const updateItemByName = (request: Request, response: Response) => {
    const idParam = parseInt(request.params.id);
    const nameParam = request.params.name;
    const idExists = idsList.includes(idParam);

    if (!idExists) {
        return response.status(404).json({ message: `List with id ${idParam} does not exist` });
    }
    const list: IPurchaseListId | undefined = shoppingLists.find(list => list.id === idParam);
    if (!list) {
        return response.status(404).json({ message: `List with id ${idParam} does not exist` });
    }
    const data: Array<IProducts> = list.data;
    let nameExists = data.find(item => item.name === nameParam);
    if (!nameExists) {
        return response.status(404).json({ message: `Item with name ${nameParam} does not exist` });
    }
    const keysData: Array<string> = Object.keys(request.body);
    if (keysData.length !== 2) {
        return response.status(400).json({ message: 'Data item can only have \"name\" and \"quantity\"' });
    }
    const dataRequiredKeys: Array<DataListRequiredKeys> = ['name', 'quantity'];
    const containsAllDataRequired: boolean = dataRequiredKeys.every((key: string) => keysData.includes(key));
    if (!containsAllDataRequired) {
        return response.status(400).json({ message: 'Required fields are: \"name\" and \"quantity\"' });
    }
    const { name, quantity } = request.body;
    if (typeof name !== 'string') {
        return response.status(400).json({ message: 'data.name must be string' });
    }
    if (typeof quantity !== 'string') {
        return response.status(400).json({ message: 'data.quantity must be string' });
    }
    nameExists.name = name;
    nameExists.quantity = quantity;
    return response.status(200).json(nameExists);
}

export const deleteItemByName = (request: Request, response: Response): Response => {
    const idParam = parseInt(request.params.id);
    const nameParam = request.params.name;
    const idExists = idsList.includes(idParam);

    if (idExists) {
        const list: IPurchaseListId | undefined = shoppingLists.find(list => list.id === idParam);
        if (list) {
            const data: Array<IProducts> = list.data;
            const nameExists = data.findIndex(item => item.name === nameParam);
            if (nameExists !== -1) {
                data.splice(nameExists, 1);
                return response.status(204).send('');
            }
            return response.status(404).json({ message: `Item with name ${nameParam} does not exist` });
        }
    }
    return response.status(404).json({ message: `List with id ${idParam} does not exist` });
}

export const deleteListById = (request: Request, response: Response): Response => {
    const idParam = parseInt(request.params.id);
    const idExists = idsList.includes(idParam);
    if (idExists) {
        shoppingLists.splice(idParam - 1, 1);
        return response.status(204).send('');
    }
    return response.status(404).json({ message: `List with id ${idParam} does not exist` });
}