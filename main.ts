import express, { Express, Request, Response } from 'express';
import * as mongoose from "mongoose";
// import dotenv from 'dotenv';
//
// dotenv.config();

const app: Express = express();
const port = 8000;
// const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
})

// connect to mongo db
const url = "mongodb+srv://admin:Hf0FcbKMB7MU96Cx@cluster0.osaykd4.mongodb.net/?retryWrites=true&w=majority"
const connect = mongoose.connect(url);
connect.then(() => {
    console.log("Connected to the database.");
}, (err) => {
    console.error(err);
    process.exit(1);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
})
