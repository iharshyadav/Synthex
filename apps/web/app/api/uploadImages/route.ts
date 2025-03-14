import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


interface ParsedForm {
  fields: any;
  files: any;
}

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: Request) => {
  try {
    const form = formidable();
    console.log(form)


    const { files } = await new Promise<ParsedForm>((resolve, reject) => {
      form.parse(req as any, (err: Error | null, fields: Fields, files: Files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = files.image;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileStream = fs.createReadStream(file.filepath);
    const fileName = `${uuidv4()}-${file.originalFilename}`;
    const params = {
      Bucket: BUCKET_NAME!,
      Key: fileName,
      Body: fileStream,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const uploadResult = await s3.upload(params).promise();

    return NextResponse.json({
      message: 'File uploaded successfully!',
      imageUrl: uploadResult.Location,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error.message },
      { status: 500 }
    );
  }
};
