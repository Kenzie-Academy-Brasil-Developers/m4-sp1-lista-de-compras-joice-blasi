import { Request, Response, NextFunction } from 'express';
import { DataListRequiredKeys, PurchaseListRequiredKeys } from "./interfaces";

export const validateBodyMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const keys: Array<string> = Object.keys(request.body);
    if (keys.length !== 2) {
        return response.status(400).json({ message: 'Request can only have \"listName\" and \"data\"' })
    }
    const requiredKeys: Array<PurchaseListRequiredKeys> = ['listName', 'data'];
    const containsAllRequired: boolean = requiredKeys.every((key: string) => keys.includes(key));
    const { listName, data } = request.body;
    if (typeof listName !== 'string') {
        return response.status(400).json({ message: 'listName must be string' });
    }
    if (containsAllRequired) {
        if (!Array.isArray(data)) {
            return response.status(400).json({ message: 'Data must be array' });
        }
        data.forEach(item => {
            const keysData = Object.keys(item);
            if (keysData.length !== 2) {
                return response.status(400).json({ message: 'Data item can only have \"name\" and \"quantity\"' });
            }
            const dataRequiredKeys: Array<DataListRequiredKeys> = ['name', 'quantity'];
            const containsAllDataRequired: boolean = dataRequiredKeys.every((key: string) => keysData.includes(key));
            if (!containsAllDataRequired) {
                return response.status(400).json({ message: 'Required fields are: \"name\" and \"quantity\"' });
            }
            if (typeof item.name !== 'string') {
                return response.status(400).json({ message: 'data.name must be string' });
            }
            if (typeof item.quantity !== 'string') {
                return response.status(400).json({ message: 'data.quantity must be string' });
            }
        });
    }
    next();
}