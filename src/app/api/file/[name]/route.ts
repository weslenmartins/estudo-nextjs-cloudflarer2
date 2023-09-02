/* eslint-disable import/no-duplicates */
import { NextResponse } from 'next/server'
import { GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { S3 } from '@/lib/r2'

const bucketName = process.env.CLOUDFLARE_R2_BUCKET

// Return specifc file from Bucket
export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const myBucketData: GetObjectCommandOutput = await S3.send(
    new GetObjectCommand({ Bucket: bucketName, Key: params.name }),
  )

  const blob = myBucketData.Body as Blob
  return new NextResponse(blob)
}
