import {
  Show,
  createResource,
  createSignal,
  onMount,
  onCleanup,
} from 'solid-js'
import { Store } from 'tauri-plugin-store-api'
import {
  gameUpdatesAvailable,
  downloadGameUpdate,
  unzipGameUpdate,
} from '../../../utils/tauri/updateGame'
import {
  createGameVersion,
  createSetGameVersion,
} from '../../providers/VersionProvider'
import Loader2 from '../../../node_modules/lucide-solid/dist/source/icons/loader-2'
import { DOWNLOAD_FOLDER } from '../../../utils/consts'
import { Play } from './Play'
import { InstallProgress } from './InstallProgress'

export function UpdateGame(props) {
  const store = new Store('.settings.dat')

  const [downloadPercent, setDownloadPercent] = createSignal(0)
  const [unzipPercent, setUnzipPercent] = createSignal(0)
  const [loading, setLoading] = createSignal(false)

  const version = createGameVersion()
  const setVersion = createSetGameVersion()

  const [updates] = createResource(version, gameUpdatesAvailable)

  const storageEventListener = () => {
    setDownloadPercent(
      Number(window.sessionStorage.getItem('update-download-percent')) || 0,
    )

    setUnzipPercent(
      Number(window.sessionStorage.getItem('update-unzip-percent')) || 0,
    )
  }

  const handleUpdates = async () => {
    const atavismxiDir = await store.get('atavismxi-dir')

    try {
      await updates().forEach(async (update) => {
        setLoading(true)
        await downloadGameUpdate(update.link, update.version)
        await unzipGameUpdate(
          atavismxiDir + DOWNLOAD_FOLDER + `/AtavismXI-${update.version}.zip`,
        )
        setLoading(false)
        setVersion(update.version)
      })
    } catch (error) {
      console.error('Error During Game Update: ', error)
      props.setErrors(error)
    }
  }

  onMount(() => {
    window.addEventListener('storage', storageEventListener)
  })

  onCleanup(() => {
    window.removeEventListener('storage', storageEventListener)
  })

  return (
    <>
      <Show
        when={
          updates()?.length > 0 &&
          downloadPercent() === 0 &&
          unzipPercent() === 0
        }
      >
        <button onClick={handleUpdates} class='updateButton'>
          Update Atavism XI
        </button>
      </Show>
      <Show
        when={
          (loading() && downloadPercent() === 0) ||
          (downloadPercent() === 100 && unzipPercent() === 0)
        }
      >
        <div class='loaderContainer'>
          <Loader2 size={40} class='lucideLoader' />
        </div>
      </Show>
      <Show when={updates()?.length === 0}>
        <Play
          playerName={props.playerName}
          errors={props.errors}
          setErrors={props.setErrors}
        />
      </Show>
      <Show when={downloadPercent() > 0 && downloadPercent() < 100}>
        <InstallProgress progress={downloadPercent()} title='Downloading' />
      </Show>
      <Show when={unzipPercent() > 0 && unzipPercent() < 100}>
        <InstallProgress progress={unzipPercent()} title='Unzipping' />
      </Show>
    </>
  )
}
