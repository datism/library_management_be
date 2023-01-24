import express, {Express, NextFunction, Request, Response} from 'express';
import * as mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {CustomError, isCustomError} from "./src/error";
import authRouter from './src/routes/auth'
import bookRouter from './src/routes/book'
import copyRouter from './src/routes/copy'
import subscriberRouter from './src/routes/subscriber'
import borrowRouter from './src/routes/borrow'
import webhookRouter from "./src/routes/webhook";


dotenv.config();

const app: Express = express();
const port = 8000;
// const port = process.env.PORT;

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
