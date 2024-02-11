import { download } from 'tauri-plugin-upload-api'
import { Store } from 'tauri-plugin-store-api'
import { invoke } from '@tauri-apps/api/tauri'
import { readTextFile } from '@tauri-apps/api/fs'
import { listen } from '@tauri-apps/api/event'
import { DOWNLOAD_FOLDER, GAME_FOLDER } from '../consts'

const store = new Store('.settings.dat')

export const gameUpdatesAvailable = async (currentVersion) => {
  if (currentVersion === 0) return []
  const response = await fetch(
    `https://www.atavismxi.com/api/update/${currentVersion}`,
  )

  if (response.status !== 204) {
    const results = await response.json()

    return results
  } else return []
}

export const downloadGameUpdate = async (updateSource, version) => {
  try {
    const atavismxiDir = await store.get('atavismxi-dir')

    let downloadProgress = 0
    let destination =
      atavismxiDir + DOWNLOAD_FOLDER + `/AtavismXI-${version}.zip`

    await download(
      updateSource,
      destination,
      (progress, total) => {
        downloadProgress += progress
        const calculatedPercentage = Math.floor(
          (downloadProgress / total) * 100,
        )

        window.sessionStorage.setItem(
          'update-download-percent',
          calculatedPercentage,
        )
        window.dispatchEvent(new Event('storage'))
      },
      { 'Content-Type': 'text/plain' }, // optional headers to send with the request
    )
  } catch (error) {
    console.error('Error downloading game update: ', error)
    return error
  }
}

export const unzipGameUpdate = async (archivePath) => {
  try {
    const atavismxiDir = await store.get('atavismxi-dir')

    const unlisten = await listen('unzip', (event) => {
      const unzipPercent = Math.floor(
        (event.payload.files_unzipped / event.payload.archive_len) * 100,
      )
      window.sessionStorage.setItem('update-unzip-percent', unzipPercent)
      window.dispatchEvent(new Event('storage'))
    })

    await invoke('unzip', {
      source: archivePath,
      target: atavismxiDir + GAME_FOLDER,
      debug: false,
    })

    unlisten()
  } catch (error) {
    console.error('Error unzipping game update: ', error)
    return error
  }
}

export const readGameVersion = async () => {
  try {
    const atavismxiDir = await store.get('atavismxi-dir')

    const versionLocation = atavismxiDir + GAME_FOLDER + '/version.json'

    const versionString = await readTextFile(versionLocation)
    const versionObj = JSON.parse(versionString)
    const versionValue = versionObj.version

    return versionValue
  } catch (error) {
    return 0
  }
}
