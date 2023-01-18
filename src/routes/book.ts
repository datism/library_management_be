import {Router} from "express";

import * as bookController from '../controllers/book';

const router = Router();

router.get('', bookController.getBooks);
router.post('', bookController.createBook);

router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;