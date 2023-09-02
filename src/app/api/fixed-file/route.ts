/* eslint-disable import/no-duplicates */
import { NextResponse } from 'next/server'
import fs from 'fs'
import {
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3 } from '@/lib/r2'

const bucketName = process.env.CLOUDFLARE_R2_BUCKET
const dataFile = `./public/imagem-example.jpg`
const dataKey = 'image-example.jpg'

// Upload specifc file to Bucket
export async function POST() {
  const data = fs.readFileSync(dataFile)

  const signedUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: bucketName,
      Key: dataKey,
    }),
    { expiresIn: 60 },
  )

  await fetch(signedUrl, {
    method: 'PUT',
    body: data,
  })

  return NextResponse.json({
    data: 'Upload file to Cloudflare R2',
    url: signedUrl,
  })
}

// Return specifc file from Bucket
export async function GET() {
  const myBucketData: GetObjectCommandOutput = await S3.send(
    new GetObjectCommand({ Bucket: bucketName, Key: dataKey }),
  )

  const blob = myBucketData.Body as Blob
  return new NextResponse(blob)
}
