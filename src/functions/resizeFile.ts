import Resizer from 'react-image-file-resizer'

export const resizeFile = (file: Blob): Promise<string> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      'JPEG',
      80,
      0,
      (uri) => {
        resolve(uri as string)
      },
      'base64',
    )
  })
