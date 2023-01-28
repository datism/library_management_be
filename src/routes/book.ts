import {Express, Request, Router} from "express";

import * as bookController from '../controllers/book';
import {upload} from "../middlewares/upload";
import {checkSchema, Schema} from "express-validator";
import {CreateBookSchema} from "../schema/book";
import {validationResultMiddleware} from "../schema";
import {RequiredMongoIdSchema} from "../schema/common";

const router = Router();

router.get('', bookController.getBooks);

router.post(
    '',
    upload.single('cover'),
    checkSchema(CreateBookSchema as Schema),
    validationResultMiddleware,
    bookController.createBook
);

router.get(
    '/:id',
    checkSchema(RequiredMongoIdSchema as Schema),
    validationResultMiddleware,
    bookController.getBookById
);

router.put(
    '/:id',
    upload.single('cover'),
    checkSchema(RequiredMongoIdSchema as Schema),
    checkSchema(CreateBookSchema as Schema),
    validationResultMiddleware,
    bookController.updateBook
);

router.delete(
    '/:id',
    checkSchema(RequiredMongoIdSchema as Schema),
    validationResultMiddleware,
    bookController.deleteBook
);

export default router;