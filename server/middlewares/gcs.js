const { storage, getPublicUrl } = require('../helpers/gcs');
// const { storage } = gcsHelpers;
const DEFAULT_BUCKET_NAME = process.env.DEFAULT_BUCKET_NAME; // Replace with the name of your bucket

/**
 * Middleware for uploading file to GCS.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {*}
 */

exports.sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(gcsFileName);
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    stream.on('error', (err) => {
        console.log('stream error')
        req.file.cloudStorageError = err;
        next(err);
    });  

    stream.on('finish', () => {
        console.log('Masuk finish')
        req.file.cloudStorageObject = gcsFileName;
        return file.makePublic()
            .then(() => {
                req.file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
                next();
            });
    });
    
    stream.end(req.file.buffer);
    
};