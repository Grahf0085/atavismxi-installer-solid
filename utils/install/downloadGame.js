import { download } from 'tauri-plugin-upload-api'
import { Store } from 'tauri-plugin-store-api'
import { exists } from '@tauri-apps/api/fs'
import { invoke } from '@tauri-apps/api/tauri'
import { DOWNLOAD_FOLDER } from '../consts'

const store = new Store('.settings.dat')

const downloadZip = async (destination) => {
  let downloadProgress = 0
  await download(
    'https://www.atavismxi.com/download/AtavismXI-1.0.zip',
    destination,
    (progress, total) => {
      downloadProgress += progress
      /* window.sessionStorage.setItem('download-progress', downloadProgress) */

      const calculatedPercentage = Math.round((downloadProgress / total) * 100)

      window.sessionStorage.setItem('download-percent', calculatedPercentage)
      window.dispatchEvent(new Event('storage'))
    }, // a callback that will be called with the download progress
    { 'Content-Type': 'text/plain' }, // optional headers to send with the request
  )
}

export const downloadGame = async () => {
  try {
    const atavismxiDir = await store.get('atavismxi-dir')

    const mainZipExists = await exists(
      atavismxiDir + DOWNLOAD_FOLDER + '/AtavismXI.zip',
    )

    if (!mainZipExists) {
      await downloadZip(atavismxiDir + DOWNLOAD_FOLDER + '/AtavismXI.zip')
    }

    if (mainZipExists) {
      const zipFileSize = await invoke('get_file_size', {
        targetFile: atavismxiDir + DOWNLOAD_FOLDER + '/AtavismXI.zip',
      })
      /* number from total of download() function */
      if (zipFileSize !== 8138183360) {
        await downloadZip(atavismxiDir + DOWNLOAD_FOLDER + '/AtavismXI.zip')
      }
    }
  } catch (error) {
    console.error('Error downloading game: ', error)
    return error
  }
}
