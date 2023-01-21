import {Router} from "express";
import * as subscriberController from '../controllers/subscriber'

const router = Router();

router.get('', subscriberController.getSubscribers);
router.post('', subscriberController.createSubscriber);

export default router;