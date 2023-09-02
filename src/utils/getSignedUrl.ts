export async function getSignedUrl(name: string | undefined) {
  const uploadResponse = await fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })

  return await uploadResponse.json()
}
