import { Store } from 'tauri-plugin-store-api'
import { watch } from 'tauri-plugin-fs-watch-api'
import { invoke } from '@tauri-apps/api/tauri'
import { DOWNLOAD_FOLDER, GAME_FOLDER } from '../consts'

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
