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

/* code for showing percent of update isn't really used - updates are too small - just using spinner for now */
export function UpdateGame(props) {
  const store = new Store('.settings.dat')

  const [updatePercent, setUpdatePercent] = createSignal()
  const [loading, setLoading] = createSignal(false)

  const version = createGameVersion()
  const setVersion = createSetGameVersion()

  const [updates] = createResource(version, gameUpdatesAvailable)

  const storageEventListener = () => {
    setUpdatePercent(
      window.sessionStorage.getItem('update-download-percent') || 0,
    )
  }

  const handleUpdates = async () => {
    const atavismxiDir = await store.get('atavismxi-dir')

    try {
      setLoading(true)

      updates().forEach(async (update) => {
        await downloadGameUpdate(update.link, update.version)
        await unzipGameUpdate(
          atavismxiDir + DOWNLOAD_FOLDER + `/AtavismXI-${update.version}.zip`,
        )
        setVersion(update.version)
      })
    } catch (error) {
      console.error('Error During Game Update: ', error)
      props.setErrors(error)
    } finally {
      setLoading(false)
    }
  }

  onMount(async () => {
    window.addEventListener('storage', storageEventListener)
  })

  onCleanup(() => {
    window.removeEventListener('storage', storageEventListener)
  })

  return (
    <>
      <Show when={updates()?.length > 0}>
        <button onClick={handleUpdates} class='updateButton'>
          Update Atavism XI
        </button>
      </Show>
      <Show when={loading()}>
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
      {/* updates are very small right now so just showing spinner instead of progress bar */}
      {/* <Show when={updatePercent() > 0 && updatePercent() < 100}> */}
      {/*   <InstallProgress progress={updatePercent()} title='Updating' /> */}
      {/* </Show> */}
    </>
  )
}
