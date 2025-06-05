const multer = require("multer");
const path = require("path");
const AppError = require("../../shared/utils/appError.util");

const createStorage = (folder = "uploads") =>
  multer.diskStorage({
    destination: (req, file, callback) => {
      const uploadPath = path.join(__dirname, "..", "public", folder);
      callback(null, uploadPath);
    },

    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const baseName = path.basename(file.originalname, ext);
      callback(null, `${Date.now()}-${baseName}${ext}`);
    },
  });

const imageFileFilter = (req, file, callback) => {
  const allowedTypes = /\.(jpeg|jpg|png|gif)$/i;
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.test(ext)) {
    return callback(new AppError("Require extension: jpeg, jpg, png, gif", 400), false);
  }
  callback(null, true);
};

const documentFileFilter = (req, file, callback) => {
  const allowedTypes = /\.(pdf|doc|docx|xls|xlsx|txt|csv)$/i;
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.test(ext)) {
    return callback(new AppError("Require extension: pdf, doc, docx, xls, xlsx, txt, csv", 400), false);
  }
  callback(null, true);
};

const uploadSingle = (fieldName, folder, fileType = "image") => {
  const storage = createStorage(folder);

  const fileFilter = fileType === "document" ? documentFileFilter : imageFileFilter;

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single(fieldName);
};

const uploadMultiple = (fieldName, maxCount = 5, folder, fileType = "image") => {
  const storage = createStorage(folder);

  const fileFilter = fileType === "document" ? documentFileFilter : imageFileFilter;

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).array(fieldName, maxCount);
};

const setBaseUrl = (req, res, next) => {
  req.baseUrlUpload = `${req.protocol}://${req.get("host")}`;
  next();
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  setBaseUrl,
};
