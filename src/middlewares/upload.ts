import multer from "multer";
import {Express} from "express";

const storage = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File, cb) {
        cb(null, "./upload/");
    },
    filename: function (req: Express.Request, file: Express.Multer.File, cb) {
        cb(null, file.originalname + '_' + Date.now());
    },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
    if(file.mimetype === "image/jpg"  ||
        file.mimetype ==="image/jpeg"  ||
        file.mimetype ===  "image/png"){

        cb(null, true);
    }else{
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });