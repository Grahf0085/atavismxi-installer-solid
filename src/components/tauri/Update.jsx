import { Show, onCleanup, createSignal, onMount } from 'solid-js'
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { listen } from '@tauri-apps/api/event'
import { InstallProgress } from './InstallProgress'
import '../../styles/components/tauri/update.css'

export function Update() {
  let updateProgress = 0

  const [update, setUpdate] = createSignal()
  const [updatePercent, setUpdatePercent] = createSignal(0)

  const storageEventListener = () => {
    setUpdatePercent(window.sessionStorage.getItem('update-percent') || 0)
  }

  const handleUpdate = async () => {
    try {
      console.log(
        `Installing update ${update().manifest?.version}, ${
          update().manifest?.date
        }, ${update().manifest.body}`,
      )
      await installUpdate()
      await relaunch()
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateProgress = (event) => {
    const { chunkLength, contentLength } = event.payload
    updateProgress += chunkLength

    const calculatedPercentage = Math.round(
      (updateProgress / contentLength) * 100,
    )

    window.sessionStorage.setItem('update-percent', calculatedPercentage)
    window.dispatchEvent(new Event('storage'))
  }

  onMount(async () => {
    window.addEventListener('storage', storageEventListener)

    onCleanup(() => {
      window.removeEventListener('storage', storageEventListener)
    })

    const update = await checkUpdate()
    setUpdate(update)

    await listen('tauri://update-download-progress', handleUpdateProgress)
  })

  return (
    <>
      <Show when={update()?.shouldUpdate && updatePercent() === 0}>
        <button class='updateButton' onClick={handleUpdate}>
          Update Launcher
        </button>
      </Show>
      <Show when={updatePercent() > 0}>
        <InstallProgress progress={updatePercent()} title='Updating' />
      </Show>
    </>
  )
}
