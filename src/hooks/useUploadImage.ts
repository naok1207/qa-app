import { storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useState } from 'react'
import { resizeFile } from 'functions/resizeFile'

type ImageUrl = string | undefined
type Upload = (
  image: File,
  onComplete: (url: string) => void,
  folder: string,
) => Promise<void>

const useUploadImage = (): [ImageUrl, Upload] => {
  const [imageUrl, setImageUrl] = useState<string>()

  const upload = async (
    image: File,
    onComplete: (url: string) => void,
    folder: string,
  ) => {
    const storageRef = ref(storage, folder)
    const resizeImage = await resizeFile(image)
    uploadString(storageRef, resizeImage, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImageUrl(downloadURL)
        onComplete(downloadURL)
      })
    })
  }

  return [imageUrl, upload]
}

export default useUploadImage
