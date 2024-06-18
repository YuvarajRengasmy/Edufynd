import S3 from "aws-sdk/clients/s3";

export const uploadFile = async (file, FOLDER) => {
  const contentType = file.type;
  const bucket = new S3({
    accessKeyId: "AKIAVG3G3CSDQY3W766E",
    secretAccessKey: "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",
    region: "ap-south-1",
  });

  const params = {
    Bucket: "webalive-adearns",
    Key: FOLDER + file.name,
    Body: file,
    ACL: "public-read",
    ETag: "ETag",
    ContentType: contentType,
  };
  return new Promise((resolve, reject) => {
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log("There was an error uploading your file: ", err);
        reject(err);
      }
      console.log("Successfully uploaded file.", data.Location);
      resolve(data);
    });
  });
};
