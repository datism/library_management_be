import {Router} from "express";
import * as webhookController from '../controllers/webhook'

const router = Router();

router.post('/borrow-expired-notification', webhookController.warningExpiredBorrow)

export default router
