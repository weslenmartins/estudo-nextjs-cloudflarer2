/* eslint-disable import/no-duplicates */
import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3 } from '@/lib/r2'
import chalk from 'chalk'

const bucketName = process.env.CLOUDFLARE_R2_BUCKET

export async function POST(request: NextRequest) {
  const { name } = await request.json()
  const fileName = name.replaceAll(' ', '-')

  console.log(
    chalk.bgGreenBright.white(
      `Arquivo ${fileName} enviado para o bucket com sucesso`,
    ),
  )
  const signedUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    }),
    { expiresIn: 60 },
  )

  return NextResponse.json({ url: signedUrl })
}
