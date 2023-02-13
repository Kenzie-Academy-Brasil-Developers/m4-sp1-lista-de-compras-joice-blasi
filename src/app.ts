import express, { Application } from 'express';
import { createPurchaseList, readAllPurchaseList, readPurchaseListId, updateItemByName, deleteItemByName, deleteListById } from './logic';
import { ensureListExists, validateBodyMiddleware } from './middlewares';

const app: Application = express();
app.use(express.json());

app.post('/purchaseList', validateBodyMiddleware, createPurchaseList);
app.get('/purchaseList', readAllPurchaseList);
app.get('/purchaseList/:id', ensureListExists, readPurchaseListId);
app.patch('/purchaseList/:id/:name', ensureListExists, updateItemByName);
app.delete('/purchaseList/:id/:name', ensureListExists, deleteItemByName);
app.delete('/purchaseList/:id', ensureListExists, deleteListById);

app.listen(3000, () => console.log('Server is running!'));