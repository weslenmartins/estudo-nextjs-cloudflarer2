'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { getSignedUrl } from '@/utils/getSignedUrl'
import { uploadFile } from '@/utils/uploadFile'

type FileProps = FormDataEntryValue & { size?: number; name?: string }

export default function PageMulti() {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadFilesToUpload, setFilesToUpload] = useState<File[] | null>([])

  async function handleUploadFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (uploadFilesToUpload !== null && uploadFilesToUpload.length > 0) {
      setIsUploading(true)
      const uploadFormData = new FormData()

      uploadFilesToUpload?.forEach((file) => {
        if (file?.size) {
          uploadFormData.append('file', file)
        }
      })

      const signedUrl = await Promise.all(
        Array.from(uploadFormData.entries()).map(
          async (entry: [string, FileProps]) => {
            const { name } = entry[1]
            const signedUrlResponse = await getSignedUrl(name)
            return signedUrlResponse
          },
        ),
      )

      await Array.from(uploadFormData.getAll('file')).forEach(
        async (file, index) => {
          const { url } = signedUrl[index]
          uploadFile(file, url)
        },
      )

      setIsUploading(false)
    }
  }

  const updateFileArray = (event: ChangeEvent<HTMLInputElement>) => {
    const newFile = event?.currentTarget?.files?.[0]
    setFilesToUpload((oldArray) => [...(oldArray as Array<any>), newFile])
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <section className="w-[400px] rounded-xl bg-zinc-100 px-5 py-6 shadow-sm outline outline-2 outline-offset-4 outline-transparent transition-all hover:shadow-md hover:outline-purple-600">
        <h1 className="mb-3 text-xl font-bold text-zinc-800">
          Selecione seu arquivo para upload
        </h1>
        <div>
          <form onSubmit={handleUploadFile} encType="multipart/form-data">
            <div className="flex flex-col gap-2">
              <input
                type="file"
                className="hover:cursor-pointer"
                name="fileToUpload"
                accept="text/*, image/*"
                onChange={updateFileArray}
              />

              <input
                type="file"
                className="hover:cursor-pointer"
                name="fileToUpload2"
                accept="text/*, image/*"
                onChange={updateFileArray}
              />
            </div>

            {isUploading ? (
              <div className="mt-4 w-full rounded-xl bg-green-600 px-4 py-2 text-center font-bold text-white">
                Fazendo upload aguarde!
              </div>
            ) : (
              <button className="mt-4 w-full rounded-xl bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700">
                Upload
              </button>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}
