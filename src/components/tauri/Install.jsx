import { Show, createSignal, onCleanup, onMount } from 'solid-js'
import { open } from '@tauri-apps/api/dialog'
import { createDir, exists } from '@tauri-apps/api/fs'
import { Store } from 'tauri-plugin-store-api'
import { invoke } from '@tauri-apps/api/tauri'
import { DOWNLOAD_FOLDER, GAME_FOLDER } from '../../../utils/consts'
import '../../styles/components/tauri/install.css'

export function Install() {
  const [downloadProgress, setDownloadProgress] = createSignal(0)
  const [unzipProgress, setUnzipProgress] = createSignal(0)
  const [watcher, setWatcher] = createSignal(null)
  const [step, setStep] = createSignal(0)

  const store = new Store('.settings.dat')

  const loadWatcher = async () => {
    const module = await import('tauri-plugin-fs-watch-api')
    setWatcher(module)
  }

  const storageEventListener = () => {
    setDownloadProgress(window.sessionStorage.getItem('download-progress'))
    setUnzipProgress(window.sessionStorage.getItem('unzip-progress'))
  }

  const pickLocationToInstall = async () => {
    try {
      const pickedLocation = await open({
        multiple: false,
        title: 'Select Location To Install Atavism XI',
        directory: true,
      })

      if (pickedLocation) {
        window.sessionStorage.setItem('download-progress', 0)
        window.sessionStorage.setItem('running-progress', 0)
        window.sessionStorage.setItem('unzip-progress', 0)

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
    const { download } = await import('tauri-plugin-upload-api')

    await download(
      'https://www.atavismxi.com/download/AtavismXI-1.0.zip',
      destination,
      (progress, total) => {}, // a callback that will be called with the download progress
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
      /* number from total of download() function */
      if (zipFileSize !== 8138183360) {
        await downloadZip(atavismxiDir + DOWNLOAD_FOLDER + '/AtavismXI.zip')
      }
    }
    setStep(2)
  }

  const unzipGame = async () => {
    const atavismxiDir = await store.get('atavismxi-dir')

    const unzipWatcher = await watcher().watch(
      atavismxiDir + GAME_FOLDER,
      async (event) => {
        const size = await invoke('get_folder_size', {
          targetDir: atavismxiDir + GAME_FOLDER,
        })

        const unzipProgress = Math.ceil((size / 15221073625) * 100)
        setUnzipProgress(unzipProgress)
        window.sessionStorage.setItem('unzip-progress', unzipProgress)
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
    loadWatcher()
    window.addEventListener('storage', storageEventListener)

    onCleanup(() => {
      window.removeEventListener('storage', storageEventListener)
    })
  })

  return (
    <>
      <Show
        when={
          (downloadProgress() === 0 && unzipProgress() === 0) ||
          (downloadProgress() === 100 && unzipProgress() === 100)
        }
      >
        <button class='installButton' onClick={installGame}>
          Install Atavism XI
        </button>
      </Show>
      <Show when={downloadProgress() > 0 && downloadProgress() < 100}>
        <InstallProgress progress={downloadProgress()} title='Downloading' />
      </Show>
      <Show
        when={
          (downloadProgress() === 100 && unzipProgress() === 0) ||
          (downloadProgress() < 1 && step() === 1)
        }
      >
        <div class='loaderContainer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            class='lucide lucide-loader-2'
          >
            <path d='M21 12a9 9 0 1 1-6.219-8.56' />
          </svg>
        </div>
      </Show>
      <Show when={unzipProgress() > 0 && unzipProgress() < 100}>
        <InstallProgress progress={unzipProgress()} title='Installing' />
      </Show>
    </>
  )
}
