import { Show, createSignal, onMount } from 'solid-js'
import { getPlayer } from '../../utils/auth'
import { Player } from './Player'
import { Auth } from './Auth'

export function Account() {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false)

  onMount(async () => {
    const player = await getPlayer()
    if (player) setIsLoggedIn(true)
  })

  return (
    <Show when={isLoggedIn()} fallback={<Auth />}>
      <Player />
    </Show>
  )
}
