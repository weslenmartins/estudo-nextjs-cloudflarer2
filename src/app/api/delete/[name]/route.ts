/* eslint-disable import/no-duplicates */
import { NextResponse } from 'next/server'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { S3 } from '@/lib/r2'
import chalk from 'chalk'

const bucketName = process.env.CLOUDFLARE_R2_BUCKET

export async function DELETE(
  request: Request,
  { params }: { params: { name: string } },
) {
  console.log(
    chalk.bgRedBright.white(
      `Arquivo ${params.name} removido do bucket com sucesso`,
    ),
  )

  await S3.send(
    new DeleteObjectCommand({ Bucket: bucketName, Key: params.name }),
  )

  return NextResponse.json({ file: params.name })
}
