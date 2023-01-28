import {Router} from "express";

import * as copyController from '../controllers/copy';
import {checkSchema, Schema} from "express-validator";
import {CreateSubscriberSchema} from "../schema/subscriber";
import {validationResultMiddleware} from "../schema";
import {CreateCopySchema, UpdateCopyStatusSchema} from "../schema/copy";
import {RequiredMongoIdSchema} from "../schema/common";

const router = Router();

router.get('', copyController.getCopies);
router.post(
    '',
    checkSchema(CreateCopySchema as Schema),
    validationResultMiddleware,
    copyController.createCopy)

router.get(
    '/:id',
    checkSchema(RequiredMongoIdSchema as Schema),
    validationResultMiddleware,
    copyController.getCopyById);

router.put(
    '/:id',
    checkSchema(RequiredMongoIdSchema as Schema),
    checkSchema(UpdateCopyStatusSchema as Schema),
    validationResultMiddleware,
    copyController.updateCopyStatus);

export default router;