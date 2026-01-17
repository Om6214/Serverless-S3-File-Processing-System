import AWS from "aws-sdk";

const s3 = new AWS.S3();

const MAX_FILE_SIZE = 1_000_000;

export const handler = async (event) => {
  console.log("=============== S3 event started now =============");

  for (const record of event.Reconds) {
    const bucketName = record.s3.bucket.name;
    const objectKey = decodeURIComponent(
      record.s3.object.key.replace(/\+/g, " "),
    );
    const objectSize = record.s3.object.size;

    console.log({
      bucketName,
      objectKey,
      objectSize,
    });

    if (objectSize > MAX_FILE_SIZE) {
      console.log("Rejected: File too large");

      // Delete large file here only
      await s3
        .deleteObject({
          Bucket: bucketName,
          Key: objectKey,
        })
        .promise();

      console.log("Deleted large file:", objectKey);
      continue;
    }
    const metadata = {
      fileName: objectKey,
      size: objectSize,
      uploadedAt: new Date().toISOString(),
      sourceBucket: bucketName,
    };

    // uploading metadata to metadata bucket
    await s3
      .putObject({
        Bucket: process.env.METADATA_BUCKET,
        Key: `${objectKey}.json`,
        Body: JSON.stringify(metadata, null, 2),
        ContentType: "application/json",
      })
      .promise();

    console.log("Metadata stored for:", objectKey);
  }

  return {
    statusCode: 200,
    body: "File processing completed",
  };
};
