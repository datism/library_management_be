import express, {Express, NextFunction, Request, Response} from 'express';
import * as mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {CustomError, isCustomError} from "./src/error";
import cors from 'cors'
import authRouter from './src/routes/auth'
import bookRouter from './src/routes/book'
import copyRouter from './src/routes/copy'
import subscriberRouter from './src/routes/subscriber'
import borrowRouter from './src/routes/borrow'
import webhookRouter from "./src/routes/webhook";
import OverdueBorrow from "./src/engines/overdueBorrow";
import exp from "constants";
import { initializeApp } from "firebase/app";

dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRJEEXeKvu8W_fbK5NEcjFlBDbc4G9_CM",
    authDomain: "fir-test-b0a9a.firebaseapp.com",
    databaseURL: "https://fir-test-b0a9a.firebaseio.com",
    projectId: "fir-test-b0a9a",
    storageBucket: "fir-test-b0a9a.appspot.com",
    messagingSenderId: "884223400011",
    appId: "1:884223400011:web:c30958670d234755df95ce",
    measurementId: "G-JFJLXLG164"
};

const app: Express = express();
const port = 8000;
// const port = process.env.PORT;

app.use(cors())
app.use(bodyParser.json())

// routes
app.use('/auth', authRouter);
app.use('/books', bookRouter)
app.use('/subscribers', subscriberRouter)
app.use('/borrows', borrowRouter)
app.use('/copies', copyRouter)
app.use('/webhook', webhookRouter)


app.use((err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
    if (isCustomError(err)) {
        console.debug(err);

        res.status(err.code).send({
            errorMessage: err.message,
            errorCode: err.customCode,
            errorData: err.data
        });
    }
    else {
        console.error(err);

        res.status(500).send({
            errorMessage: err.message,
            errorCode: 50000
        });
    }
});

// connect to mongo db
const url = "mongodb+srv://admin:Hf0FcbKMB7MU96Cx@cluster0.osaykd4.mongodb.net/?retryWrites=true&w=majority"
const connect = mongoose.connect(url);
connect.then(() => {
    console.log("Connected to the database.");
}, (err) => {
    console.error(err);
    process.exit(1);
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

OverdueBorrow.execute()

export const firebaseApp = initializeApp(firebaseConfig)
