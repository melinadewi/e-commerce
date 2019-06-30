const {Storage} = require('@google-cloud/storage');
const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = process.env.GOOGLE_CLOUD_KEYFILE; // Replace with the path to the downloaded private key
const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});

const getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
module.exports = { storage, getPublicUrl } // added