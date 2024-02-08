import { Show, createSignal, onCleanup, onMount } from 'solid-js'
import Loader2 from '../../../node_modules/lucide-solid/dist/source/icons/loader-2'
import { InstallProgress } from './InstallProgress'
import {
  pickLocationToInstall,
  downloadGame,
  unzipGame,
} from '../../../utils/tauri/installGame'
import '../../styles/components/tauri/install.css'

export function Install() {
  const [downloadPercent, setDownloadPercent] = createSignal(0)
  const [unzipPercent, setUnzipPercent] = createSignal(0)
  const [loading, setLoading] = createSignal(false)

  const storageEventListener = () => {
    setDownloadPercent(window.sessionStorage.getItem('download-percent') || 0)
    setUnzipPercent(window.sessionStorage.getItem('unzip-percent') || 0)
  }

  const installGame = async () => {
    try {
      const locationPicked = await pickLocationToInstall()
      if (locationPicked) {
        setLoading(true)
        await downloadGame()
        await unzipGame()
      }
    } catch (error) {
      console.error('Error During Game Installation: ', error)
      props.setErrors(error)
    } finally {
      setLoading(false)
    }
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
          (downloadPercent() >= 100 && unzipPercent() >= 100)
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
          (unzipPercent() < 1 && downloadPercent() >= 100) ||
          (downloadPercent() < 1 && loading())
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
