import { Show, createSignal, onCleanup, onMount } from 'solid-js'
import { open } from '@tauri-apps/api/dialog'
import { createDir, exists } from '@tauri-apps/api/fs'
import { Store } from 'tauri-plugin-store-api'
import { watch } from 'tauri-plugin-fs-watch-api'
import { invoke } from '@tauri-apps/api/tauri'
import { download } from 'tauri-plugin-upload-api'
import Loader2 from '../../../node_modules/lucide-solid/dist/source/icons/loader-2'
import { DOWNLOAD_FOLDER, GAME_FOLDER } from '../../../utils/consts'
import { InstallProgress } from './InstallProgress'
import '../../styles/components/tauri/install.css'

export function Install() {
  const [downloadPercent, setDownloadPercent] = createSignal(0)
  const [unzipPercent, setUnzipPercent] = createSignal(0)
  const [step, setStep] = createSignal(0)

  const store = new Store('.settings.dat')

  const storageEventListener = () => {
    setDownloadPercent(window.sessionStorage.getItem('download-percent'))
    setUnzipPercent(window.sessionStorage.getItem('unzip-percent'))
  }

  const pickLocationToInstall = async () => {
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

        setStep(1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const downloadZip = async (destination) => {
    let downloadProgress = 0
    await download(
      'https://www.atavismxi.com/download/AtavismXI-1.0.zip',
      destination,
      (progress, total) => {
        downloadProgress += progress
        /* window.sessionStorage.setItem('download-progress', downloadProgress) */

        const calculatedPercentage = Math.round(
          (downloadProgress / total) * 100,
        )

        window.sessionStorage.setItem('download-percent', calculatedPercentage)
        window.dispatchEvent(new Event('storage'))
      }, // a callback that will be called with the download progress
      { 'Content-Type': 'text/plain' }, // optional headers to send with the request
    )
  }

  const downloadGame = async () => {
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
      console.log('ZIP FILE SIZE IS: ', zipFileSize)
      /* number from total of download() function */
      if (zipFileSize !== 8138183360) {
        await downloadZip(atavismxiDir + DOWNLOAD_FOLDER + '/AtavismXI.zip')
      }
    }

    setStep(2)
  }

  const unzipGame = async () => {
    const atavismxiDir = await store.get('atavismxi-dir')

    const unzipWatcher = await watch(
      atavismxiDir + GAME_FOLDER,
      async (event) => {
        const size = await invoke('get_folder_size', {
          targetDir: atavismxiDir + GAME_FOLDER,
        })

        /* I don't know about this total number */
        const unzipPercent = Math.ceil((size / 15221073625) * 100)
        /* setUnzipProgress(unzipPercent) */
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
    setStep(3)
  }

  const installGame = async () => {
    await pickLocationToInstall()
    if (step() === 1) await downloadGame()
    if (step() === 2) await unzipGame()
    //reloading to get checkForCli function in Play.jsx to work
    if (step() === 3) window.location.reload(true)
  }

  onMount(() => {
    window.addEventListener('storage', storageEventListener)

    onCleanup(() => {
      window.removeEventListener('storage', storageEventListener)
    })
  })

  return (
    <>
      <Show
        when={
          (downloadPercent() === 0 && unzipPercent() === 0) ||
          (downloadPercent() === 100 && unzipPercent() === 100)
        }
      >
        <button class='installButton' onClick={installGame}>
          Install Atavism XI
        </button>
      </Show>
      <Show when={downloadPercent() > 0 && downloadPercent() < 100}>
        <InstallProgress progress={downloadPercent()} title='Downloading' />
      </Show>
      <Show
        when={
          (unzipPercent() < 1 && step() === 2) ||
          (downloadPercent() < 1 && step() === 1)
        }
      >
        <div class='loaderContainer'>
          <Loader2 size={40} class='lucideLoader' />
        </div>
      </Show>
      <Show when={unzipPercent() > 0 && unzipPercent() < 100}>
        <InstallProgress progress={unzipPercent()} title='Installing' />
      </Show>
    </>
  )
}
