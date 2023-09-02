export async function uploadFile(file: FormDataEntryValue, url: string) {
  const R2Response = await fetch(url, {
    method: 'PUT',
    body: file,
  })

  if (R2Response.ok) {
    console.log('O arquivo foi carregado com sucesso!')
  } else {
    console.error('Ocorreu um erro ao carregar o arquivo.')
  }
}
