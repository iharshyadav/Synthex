'use server'
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

export async function handleSubmit(formData: FormData) {
    try {

        console.log(formData)

        const client = new S3Client({
            region: process.env.AWS_REGION,
        });

        const files = [];
        for (let i = 0; ; i++) {
            const currentFile = formData.get(`images[${i}]`);
            if (!currentFile || !(currentFile instanceof File)) break;
            files.push(currentFile);
        }

        // console.log(files)

        const filePromises = files.map(async (file) => {
          if (!file || !(file instanceof File)) return null;
          
          const fileKey = nanoid();
          const contentType = file.type || 'application/octet-stream';
          
          const { url, fields } = await createPresignedPost(client, {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: fileKey,
            Conditions: [
              ["content-length-range", 0, 10485760],
              { "Content-Type": contentType },
            ],
          });
          
          fields['Content-Type'] = contentType;
          
          const formDataS3 = new FormData();
          Object.entries(fields).forEach(([key, value]) => {
            formDataS3.append(key, value);
          });
          formDataS3.append('file', file);
          
          const uploadResponse = await fetch(url, {
            method: 'POST',
            body: formDataS3,
          });
          
          if (uploadResponse.ok) {
            return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
          }
          return null;
        });
        
        const uploadedUrls = await Promise.all(filePromises);
        console.log(uploadedUrls.filter(Boolean))
        return uploadedUrls.filter(Boolean) as string[];
        
    } catch (err) {
        console.error('Error uploading file:', err);
    }
}
