import multer, { memoryStorage } from "multer"
const storage=multer.memoryStorage();
export const singleUpload=multer({storage}).single("file");