import {Router} from "express";

import * as borrowController from '../controllers/borrow';

const router = Router();

router.get('', borrowController.getBorrows);
router.post('', borrowController.createBorrow);

router.get('/:id', borrowController.getBorrowById);
router.put('/:id', borrowController.updateBorrowStatus);

export default router;