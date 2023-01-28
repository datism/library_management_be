import {Express, Request, Router} from "express";

import * as bookController from '../controllers/book';
import {upload} from "../middlewares/upload";

const router = Router();

router.get('', bookController.getBooks);
router.post('', upload.single('cover'), bookController.createBook);

router.get('/:id', bookController.getBookById);
router.put('/:id', upload.single('cover'), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;