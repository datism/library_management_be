import express, { Express, Request, Response } from 'express';
import * as mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {CustomError, isCustomError} from "./src/error";
import {routes} from "./src/routes";


dotenv.config();

const app: Express = express();
const port = 8000;
// const port = process.env.PORT;

app.use(bodyParser.json())

// routes
app.use('/', routes);
// TODO: Implement '/me' endpoint later
// app.use('/me', );
// app.use('/books', bookRouter)
// app.use('/readers', readerRouter)
// app.use('/borrows', borrowRouter)

// error handler
app.use((err: CustomError | Error, req: Request, res: Response) => {
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
