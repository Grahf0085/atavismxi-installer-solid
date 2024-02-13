import { createSignal, onMount, onCleanup, Show } from 'solid-js'
import { Store } from 'tauri-plugin-store-api'
import { invoke } from '@tauri-apps/api/tauri'
import { exists } from '@tauri-apps/api/fs'
import { type } from '@tauri-apps/api/os'
import { watch } from 'tauri-plugin-fs-watch-api'
import { GAME_FOLDER } from '../../../utils/consts'
import '../../styles/components/tauri/play.css'

export function Play(props) {
  let cliWatcher = () => {}

  const store = new Store('.settings.dat')

  const [currentOs, setCurrentOs] = createSignal()
  const [unzipPercent, setUnzipPercent] = createSignal(0)
  const [cliExists, setCliExists] = createSignal(false)

  const checkForCli = async (cliPath) => {
    const cliExists = await exists(cliPath)
    setCliExists(cliExists)
  }

  const checkForWine = async () => {
    const isWineInstalled = await invoke('is_wine_installed')
    if (!isWineInstalled && !props.errors.includes('Please Install Wine'))
      props.setErrors([...props.errors, 'Please Install Wine'])
    if (isWineInstalled)
      props.setErrors(
        props.errors.filter((error) => error !== 'Please Install Wine'),
      )
    return isWineInstalled
  }

  const runAshita = async () => {
    try {
      const playerName = props.playerName
      const folderWithCli = (await store.get('atavismxi-dir')) + GAME_FOLDER

      if (currentOs() === 'Linux') {
        const isWineInstalled = await checkForWine()

        if (isWineInstalled) {
          await invoke('run_wine', {
            installedDir: folderWithCli,
            playerName,
          })
        }
      }

      if (currentOs() === 'Windows_NT') {
        await invoke('run_ashita_windows', {
          installedDir: folderWithCli,
          playerName,
        })
      }
    } catch (error) {
      console.error('Error running ashita: ', error)
      props.setErrors(error)
    }
  }

  const runGame = async () => {
    if (!cliExists() && !props.errors.includes("Can't Locate Ashita-cli.exe"))
      props.setErrors([...props.errors, "Can't Locate Ashita-cli.exe"])

    if (cliExists())
      props.setErrors(
        props.errors.filter((error) => error !== "Can't Locate Ashita-cli.exe"),
      )

    if (cliExists()) runAshita()
  }

  const storageEventListener = () => {
    setUnzipPercent(Number(window.sessionStorage.getItem('unzip-percent')) || 0)
  }

  onMount(async () => {
    const osType = await type()
    setCurrentOs(osType)

    if (osType === 'Linux') await checkForWine()

    window.addEventListener('storage', storageEventListener)

    const installedDir = await store.get('atavismxi-dir')
    const cliPath = installedDir + GAME_FOLDER + '/Ashita-cli.exe'

    await checkForCli(cliPath)

    try {
      cliWatcher = await watch(
        installedDir,
        async (event) => {
          await checkForCli(cliPath)
        },
        { recursive: true },
      )
    } catch (error) {
      setCliExists(false)
    }
  })

  onCleanup(() => {
    window.removeEventListener('storage', storageEventListener)
    cliWatcher()
  })

  return (
    <Show when={cliExists() && (unzipPercent() === 0 || unzipPercent() >= 100)}>
      <button onClick={runGame} class='playButton'>
        Play Atavism XI
      </button>
    </Show>
  )
}
