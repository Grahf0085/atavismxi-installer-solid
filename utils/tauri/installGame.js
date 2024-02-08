import { open } from '@tauri-apps/api/dialog'
import { createDir, exists } from '@tauri-apps/api/fs'
import { Store } from 'tauri-plugin-store-api'
import { download } from 'tauri-plugin-upload-api'
import { invoke } from '@tauri-apps/api/tauri'
import { watch } from 'tauri-plugin-fs-watch-api'
import { DOWNLOAD_FOLDER, GAME_FOLDER } from '../consts'

const store = new Store('.settings.dat')

export const pickLocationToInstall = async () => {
  try {
    const pickedLocation = await open({
      multiple: false,
      title: 'Select Location To Install Atavism XI',
      directory: true,
    })

    if (pickedLocation) {
      window.sessionStorage.setItem('download-percent', 0)
      window.sessionStorage.setItem('unzip-percent', 0)

      const downloadDir = pickedLocation + DOWNLOAD_FOLDER
      const gameDir = pickedLocation + GAME_FOLDER

      const downloadDirExists = await exists(downloadDir)
      const gameDirExists = await exists(gameDir)

      if (!downloadDirExists) {
        await createDir(downloadDir, {
          recursive: true,
        })
      }

      if (!gameDirExists) {
        await createDir(gameDir, {
          recursive: true,
        })
      }

      await store.set('atavismxi-dir', pickedLocation)
      await store.save()

      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

const downloadZip = async (destination) => {
  let downloadProgress = 0
  await download(
    'https://www.atavismxi.com/download/AtavismXI-1.0.zip',
    destination,
    (progress, total) => {
      downloadProgress += progress

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

export const unzipGame = async () => {
  const store = new Store('.settings.dat')
  const atavismxiDir = await store.get('atavismxi-dir')

  const unzipWatcher = await watch(
    atavismxiDir + GAME_FOLDER,
    async (event) => {
      const size = await invoke('get_folder_size', {
        targetDir: atavismxiDir + GAME_FOLDER,
      })

      /* I don't know about this total number */
      const unzipPercent = Math.ceil((size / 15221073625) * 100)
      window.sessionStorage.setItem('unzip-percent', unzipPercent)
      window.dispatchEvent(new Event('storage'))
    },
    { recursive: true },
  )

  await invoke('unzip_archive', {
    archivePath: atavismxiDir + DOWNLOAD_FOLDER + '/AtavismXI.zip',
    targetDir: atavismxiDir + GAME_FOLDER,
  })

  unzipWatcher()
}
