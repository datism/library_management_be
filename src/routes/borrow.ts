import {Router} from "express";

import * as borrowController from '../controllers/borrow';
import {checkSchema, Schema} from "express-validator";
import {RequiredMongoIdSchema} from "../schema/common";
import {validationResultMiddleware} from "../schema";
import {CreateBorrowSchema, UpdateBorrowStatusSchema} from "../schema/borrow";

const router = Router();

router.get('', borrowController.getBorrows);
router.post(
    '',
    checkSchema(CreateBorrowSchema as Schema),
    validationResultMiddleware,
    borrowController.createBorrow);

router.get(
    '/:id',
    checkSchema(RequiredMongoIdSchema as Schema),
    validationResultMiddleware,
    borrowController.getBorrowById
);

router.put(
    '/:id',
    checkSchema(RequiredMongoIdSchema as Schema),
    checkSchema(UpdateBorrowStatusSchema as Schema),
    validationResultMiddleware,
    borrowController.updateBorrowStatus
);

export default router;