/* eslint-disable import/no-duplicates */
import { NextResponse } from 'next/server'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import {} from '@aws-sdk/s3-request-presigner'
import { S3 } from '@/lib/r2'

const bucketName = process.env.CLOUDFLARE_R2_BUCKET

// Return all files from Bucket
export async function GET() {
  const myBucketInfo = await S3.send(
    new ListObjectsV2Command({ Bucket: bucketName }),
  )

  return NextResponse.json({
    ...myBucketInfo.Contents,
  })
}
