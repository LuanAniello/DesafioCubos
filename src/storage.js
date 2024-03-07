const { S3Client } = require("@aws-sdk/client-s3");

const informacoesBucket = {
    endpoint: process.env.ENDPOINT_S3,
    region: process.env.REGION,
    accessKeyId: process.env.KEY_ID, 
    secretAccessKey: process.env.APP_KEY,
    bucketName: process.env.BLACKBLAZE_BUCKET
}

const s3Client = new S3Client({
    endpoint: `https://${informacoesBucket.endpoint}`, 
    region: informacoesBucket.region, 
    credentials: {
      accessKeyId: informacoesBucket.accessKeyId, 
      secretAccessKey: informacoesBucket.secretAccessKey, 
    },
  });

module.exports = {
    s3Client,
    informacoesBucket
}