import {Router} from "express";

import * as copyController from '../controllers/copy';

const router = Router();

router.get('', copyController.getCopies);

router.get('/:id', copyController.getCopyById);
router.put('/:id', copyController.updateCopyStatus);

export default router;