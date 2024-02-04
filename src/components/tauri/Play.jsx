import { createSignal, onMount, Show } from 'solid-js'
import { Store } from 'tauri-plugin-store-api'
import { invoke } from '@tauri-apps/api/tauri'
import { exists } from '@tauri-apps/api/fs'
import { type } from '@tauri-apps/api/os'
import { GAME_FOLDER } from '../../../utils/consts'
import '../../styles/components/tauri/play.css'

export function Play(props) {
  const store = new Store('.settings.dat')

  const [currentOs, setCurrentOs] = createSignal()
  const [isInstalled, setIsInstalled] = createSignal(false)

  const checkForCli = async () => {
    const installedDir = await store.get('atavismxi-dir')
    const cliPath = installedDir + GAME_FOLDER + '/Ashita-cli.exe'
    const cliExists = await exists(cliPath)

    if (!cliExists && !props.errors.includes("Can't Locate Ashita-cli.exe")) {
      props.setErrors([...props.errors, "Can't Locate Ashita-cli.exe"])
    }
    if (cliExists)
      props.setErrors(
        props.errors.filter((error) => error !== "Can't Locate Ashita-cli.exe"),
      )

    return cliExists
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

  const runWine = async () => {
    const playerName = props.playerName
    const folderWithCli = (await store.get('atavismxi-dir')) + GAME_FOLDER

    await invoke('run_wine', {
      installedDir: folderWithCli,
      playerName,
    })
  }

  const runGame = async () => {
    const isWineInstalled = await checkForWine()
    const cliExists = await checkForCli()

    if (isWineInstalled && cliExists) runWine()
  }

  onMount(async () => {
    const osType = await type()
    setCurrentOs(osType)

    if (osType === 'Linux') await checkForWine()

    const installedDir = await store.get('atavismxi-dir')
    const installedDirExists = await exists(installedDir + GAME_FOLDER)

    if (installedDirExists) setIsInstalled(true)
  })

  return (
    <Show when={currentOs() === 'Linux' && isInstalled()}>
      <button onClick={runGame} class='playButton'>
        Play Atavism XI
      </button>
    </Show>
  )
}
