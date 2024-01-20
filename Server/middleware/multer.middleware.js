import multer from 'multer';
import Datauri from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('avatar');
const dUri = new Datauri();
const dataUri = (req) => {
    return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
}

export { multerUploads, dataUri };