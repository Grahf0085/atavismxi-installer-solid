import { Show, onCleanup, createSignal, onMount } from 'solid-js'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { listen } from '@tauri-apps/api/event'
import Loader2 from '../../../node_modules/lucide-solid/dist/source/icons/loader-2'
import { InstallProgress } from './InstallProgress'
import '../../styles/components/tauri/update.css'

export function UpdateLauncher(props) {
  let updateProgress
  let updateDownloadUnlisten
  let downloadGameUnlisten
  let unzipGameUnlisten

  const [update, setUpdate] = createSignal()
  const [updatePercent, setUpdatePercent] = createSignal(0)
  const [installingGame, setInstallingGame] = createSignal(false)
  const [loading, setLoading] = createSignal(false)

  const storageEventListener = () => {
    setUpdatePercent(
      Number(window.sessionStorage.getItem('update-percent')) || 0,
    )
  }

  const handleUpdateProgress = (event) => {
    const { chunkLength, contentLength } = event.payload
    updateProgress += chunkLength

    const calculatedPercentage = Math.floor(
      (updateProgress / contentLength) * 100,
    )

    window.sessionStorage.setItem('update-percent', calculatedPercentage)
    window.dispatchEvent(new Event('storage'))
    //hack to *fix* bug where updateProgress goes over contentLength
    if (updateProgress >= contentLength) {
      setLoading(true)
      updateDownloadUnlisten()
    }
  }

  const handleUpdate = async () => {
    try {
      updateProgress = 0
      updateDownloadUnlisten = await listen(
        'tauri://update-download-progress',
        handleUpdateProgress,
      )
      await installUpdate()
      await relaunch()
    } catch (error) {
      console.error(error)
      props.setErrors(error)
    } finally {
      updateDownloadUnlisten()
      setLoading(false)
    }
  }

  onMount(async () => {
    window.addEventListener('storage', storageEventListener)

    const update = await checkUpdate()
    setUpdate(update)

    downloadGameUnlisten = await listen('download://progress', (event) => {
      setInstallingGame(true)
    })

    unzipGameUnlisten = await listen('unzip', (event) => {
      setInstallingGame(true)
      const unzipPercent = Math.floor(
        (event.payload.files_unzipped / event.payload.archive_len) * 100,
      )

      if (unzipPercent === 100) setInstallingGame(false)
    })
  })

  onCleanup(() => {
    window.removeEventListener('storage', storageEventListener)
    downloadGameUnlisten()
    unzipGameUnlisten()
  })

  return (
    <Show when={!installingGame()}>
      <Show when={update()?.shouldUpdate && updatePercent() === 0}>
        <button class='updateButton' onClick={handleUpdate}>
          Update Launcher
        </button>
      </Show>
      <Show when={updatePercent() > 0}>
        <InstallProgress progress={updatePercent()} title='Updating' />
      </Show>
      <Show when={loading()}>
        <div class='loaderContainer'>
          <Loader2 size={40} class='lucideLoader' />
        </div>
      </Show>
    </Show>
  )
}
