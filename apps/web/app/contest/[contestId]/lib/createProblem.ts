'use server'
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import Contest from "lib/contests/models/contestSchema";
export async function handleSubmit(formData: FormData , contestId : string) {
    try {

        // console.log(formData)

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
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const difficulty = formData.get('difficulty') as "Easy" | "Medium" | "Hard";
        const points = parseInt(formData.get('points') as string) || 0;
        const timeLimit = parseInt(formData.get('timeLimit') as string) || 2;
        const memoryLimit = parseInt(formData.get('memoryLimit') as string) || 256;
        // const contestId = formData.get('contestId') as string;

        const testCasesString = formData.get('testcases') as string || formData.get('testCases') as string;
        let testCases = [];
        try {
          if (testCasesString) {
            testCases = JSON.parse(testCasesString);
            testCases = testCases.map((tc:any) => ({
              input: tc.input || '',
              output: tc.output || '',
              public: tc.public !== undefined ? tc.public : false
            }));
          }
        } catch (error) {
          console.error('Error parsing test cases:', error);
          testCases = [];
        }

        const newProblem = {
          problemId: new mongoose.Types.ObjectId(),
          title,
          description,
          testCases,
          image: uploadedUrls.filter(Boolean) as string[],
          difficulty,
          points,
          timeLimit,
          memoryLimit
        };

        console.log(newProblem)

        await Contest.findByIdAndUpdate(
          contestId,
          { $push: { problems: newProblem } },
          { new: true }
        );
        return {
          status : 200,
          images : uploadedUrls.filter(Boolean) as string[]
        };
        
    } catch (err) {
        console.error('Error uploading file:', err);
        return {
          status : 500,
          images : 'Error uploading file:', err
        };
    }
}
