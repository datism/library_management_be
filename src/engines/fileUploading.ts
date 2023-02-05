import {Express} from "express";
import {firebaseApp} from "../../main";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import fs from "fs";

// Import the functions you need from the SDKs you need
const { initializeApp, cert } = require('firebase-admin/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const uploadFile = async (file: Express.Multer.File, filename: string, path: string = '') => {

    const storage = getStorage(firebaseApp)

    const coverRefs = ref(storage, `covers/${filename}`);
    try {
        const uploadedResult = await uploadBytes(
            coverRefs,
            fs.readFileSync(file.path),
            {
                contentType: file.mimetype
            }
        )

        console.log(uploadedResult)

        return await getDownloadURL(coverRefs)
    }
    catch (e) {
        console.error(e)
    }
}
