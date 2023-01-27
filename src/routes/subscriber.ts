import {Router} from "express";
import * as subscriberController from '../controllers/subscriber'
import {checkSchema, Schema} from "express-validator";
import {validationResultMiddleware} from "../schema";
import {CreateSubscriberSchema} from "../schema/subscriber";

const router = Router();

router.get('', subscriberController.getSubscribers);
router.post(
    '',
    checkSchema(CreateSubscriberSchema as Schema),
    validationResultMiddleware,
    subscriberController.createSubscriber);

export default router;