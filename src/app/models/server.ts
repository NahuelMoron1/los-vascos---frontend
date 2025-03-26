import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from '../routes/Products';
import featuresRouter from '../routes/Features';
import categoriesRouter from '../routes/Categories';
import usersRouter from '../routes/Users';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env['PORT'] || '3000';
        this.listen();
        this.middlewares()
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on port ${this.port}`);
        })
    }
    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({ msg: 'api Working' });
        })
        this.app.use('/api/Products', productRouter);
        this.app.use('/api/Features', featuresRouter);
        this.app.use('/api/Categories', categoriesRouter);
        this.app.use('/api/Users', usersRouter);
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    async dbConnect() {
        try{
            await db.authenticate();
        console.log("DATABASE CONNECTED");
        }catch(err){
            console.log("You have an error");
        }
    }
}
export default Server;