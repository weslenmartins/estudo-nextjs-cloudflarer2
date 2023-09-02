'use client'

import { useRef, useState } from 'react'
import { FilePond } from 'react-filepond'
import { getSignedUrl } from '@/utils/getSignedUrl'
import { uploadFile } from '@/utils/uploadFile'
import 'filepond/dist/filepond.min.css'

export default function UploadPage() {
  const [files, setFiles] = useState([])
  const filePondRef = useRef(null)

  const handleProcessFileStart = async (event) => {
    event.preventDefault()

    if (filePondRef.current && files.length > 0) {
      filePondRef.current.processFiles() // Start upload process
    }
  }

  const handleProcessFileToServer = async (error, file) => {
    if (!error) {
      const name = file.name
      const signedUrlResponse = await getSignedUrl(file.name)
      await uploadFile(file, signedUrlResponse.url)
      return name
    }
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <section className="w-[400px] rounded-xl bg-zinc-100 px-5 py-6 shadow-sm outline outline-2 outline-offset-4 outline-transparent transition-all hover:shadow-md hover:outline-purple-600">
        <h1 className="mb-3 text-xl font-bold text-zinc-800">
          Selecione seu arquivo para upload
        </h1>
        <div>
          <form onSubmit={handleProcessFileStart}>
            <div className="App">
              <FilePond
                ref={filePondRef}
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                allowProcess={false}
                instantUpload={false}
                maxFiles={5}
                server={{
                  process: async (fieldName, file, metadata, load) => {
                    handleProcessFileToServer(null, file).then(() => load())
                  },
                }}
                name="files"
                credits={null}
                allowRevert={false}
                acceptedFileTypes={['image/*', 'plain/text']}
                labelIdle='Solte arquivos aqui para enviar ou <span class="filepond--label-action">Navegue</span>'
              />
            </div>
            <button className="mt-4 w-full rounded-xl bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700">
              Upload
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
