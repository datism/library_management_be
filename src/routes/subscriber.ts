import {Router} from "express";
import * as subscriberController from '../controllers/subscriber'
import {checkSchema, Schema} from "express-validator";
import {validationResultMiddleware} from "../schema";
import {CreateSubscriberSchema} from "../schema/subscriber";
import {RequiredMongoIdSchema} from "../schema/common";

const router = Router();

router.get('', subscriberController.getSubscribers);
router.post(
    '',
    checkSchema(CreateSubscriberSchema as Schema),
    validationResultMiddleware,
    subscriberController.createSubscriber);
router.get(
    '/:id',
    checkSchema(RequiredMongoIdSchema as Schema),
    validationResultMiddleware,
    subscriberController.getSubscriberById
);

export default router;