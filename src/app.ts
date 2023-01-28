import express, { Application } from 'express';
import { createPurchaseList, readAllPurchaseList, readPurchaseListId, updateItemByName, deleteItemByName, deleteListById } from './logic';
import { validateBodyMiddleware } from './middlewares';

const app: Application = express();
app.use(express.json());

app.post('/purchaseList', validateBodyMiddleware, createPurchaseList);
app.get('/purchaseList', readAllPurchaseList);
app.get('/purchaseList/:id', readPurchaseListId);
app.patch('/purchaseList/:id/:name', updateItemByName);
app.delete('/purchaseList/:id/:name', deleteItemByName);
app.delete('/purchaseList/:id', deleteListById);

app.listen(3000, () => console.log('Server is running!'));