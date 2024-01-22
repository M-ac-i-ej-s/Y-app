import multer from 'multer';
import Datauri from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array('images');
const dUri = new Datauri();
const dUri2 = new Datauri();
const dataUri = (req) => {
    let file1 = '';
    let file2 = '';
    if(req.files[0]) {
        file1 = dUri.format(path.extname(req.files[0].originalname).toString(), req.files[0].buffer)
    }
    if(req.files[1]) {
        file2 = dUri2.format(path.extname(req.files[1].originalname).toString(), req.files[1].buffer)
    }

    return [file1, file2];
}

export { multerUploads, dataUri };