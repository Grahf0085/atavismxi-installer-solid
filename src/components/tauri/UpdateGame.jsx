import {
  Show,
  createResource,
  createSignal,
  onMount,
  onCleanup,
} from 'solid-js'
import { readTextFile } from '@tauri-apps/api/fs'
import { Store } from 'tauri-plugin-store-api'
import {
  gameUpdatesAvailable,
  downloadGameUpdate,
  unzipGameUpdate,
} from '../../../utils/install/updateGame'
import Loader2 from '../../../node_modules/lucide-solid/dist/source/icons/loader-2'
import { GAME_FOLDER, DOWNLOAD_FOLDER } from '../../../utils/consts'

//for each item in array use download link to download zip
//extract zip to game folder - should overwrite files already there

export function UpdateGame() {
  const store = new Store('.settings.dat')

  const [version, setVersion] = createSignal(0)
  const [updatePercent, setUpdatePercent] = createSignal()
  const [loading, setLoading] = createSignal(false)

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

    const versionLocation =
      (await store.get('atavismxi-dir')) + GAME_FOLDER + '/version.json'

    const versionString = await readTextFile(versionLocation)
    const versionObj = JSON.parse(versionString)
    const versionValue = versionObj.version

    setVersion(versionValue)
  })

  onCleanup(() => {
    window.removeEventListener('storage', storageEventListener)
  })

  return (
    <>
      <Show when={updates()?.length > 0}>
        <button onClick={handleUpdates} class='updateButton'>
          Update Game
        </button>
      </Show>
      <Show when={loading()}>
        <div class='loaderContainer'>
          <Loader2 size={40} class='lucideLoader' />
        </div>
      </Show>
      {/* updates are very small right now so just showing spinner instead of progress bar */}
      {/* <Show when={updatePercent() > 0 && updatePercent() < 100}> */}
      {/*   <InstallProgress progress={updatePercent()} title='Updating' /> */}
      {/* </Show> */}
    </>
  )
}
