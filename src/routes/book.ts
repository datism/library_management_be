import {Express, Request, Router} from "express";

import * as bookController from '../controllers/book';
import {upload} from "../middlewares/upload";
import * as copyController from "../controllers/copy";

const router = Router();

router.get('', bookController.getBooks);
router.post('', upload.single('cover'), bookController.createBook);

router.get('/:id', bookController.getBookById);
router.put('/:id', upload.single('cover'), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

router.get('/:id/copies', bookController.getCopiesFromBook);
router.post('/:id/copies', bookController.createCopy);

export default router;