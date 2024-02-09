import { createContext, createSignal, onMount, useContext } from 'solid-js'
import { readGameVersion } from '../../utils/tauri/updateGame'

const GameVersionContext = createContext()

export const GameVersionProvider = (props) => {
  const [version, setVersion] = createSignal(0)

  onMount(async () => {
    const gameVersion = await readGameVersion()
    setVersion(gameVersion)
  })

  return (
    <GameVersionContext.Provider value={[version, setVersion]}>
      {props.children}
    </GameVersionContext.Provider>
  )
}

export const createGameVersion = () => {
  const newGameVersion = useContext(GameVersionContext)[0]
  return newGameVersion
}

export const createSetGameVersion = () => {
  const newSetGameVersion = useContext(GameVersionContext)[1]
  return newSetGameVersion
}
