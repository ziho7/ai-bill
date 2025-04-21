import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { chatRoutes } from './src/chatRoute';
import { recordRoute } from './src/recordRoute';
//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/chat', chatRoutes);
app.use('/records', recordRoute);

app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});