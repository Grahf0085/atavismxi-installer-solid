import { open } from '@tauri-apps/api/dialog'
import { createDir, exists } from '@tauri-apps/api/fs'
import { Store } from 'tauri-plugin-store-api'
import { DOWNLOAD_FOLDER, GAME_FOLDER } from '../consts'

export const pickLocationToInstall = async () => {
  const store = new Store('.settings.dat')

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
