import { For, Show, createResource, createSignal, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { Adventurer } from '../components/adventurer/Adventurer'
import { Install } from '../components/tauri/Install'
import { Play } from '../components/tauri/Play'
import { Update } from '../components/tauri/Update'
import { fetchPlayerAdventurers } from '../../utils/search'
import { getPlayer } from '../../utils/auth'
import '../styles/pages/player.css'

export function Player() {
  const [playerId, setPlayerId] = createSignal()
  const [playerName, setPlayerName] = createSignal()
  const [errors, setErrors] = createSignal([])

  const [playersAdventurers] = createResource(playerId, fetchPlayerAdventurers)

  const navigate = useNavigate()

  onMount(async () => {
    const player = await getPlayer()

    if (!player) {
      navigate('/auth', { replace: true })
    }

    setPlayerId(player?.id)
    setPlayerName(player?.login)
  })

  const handleLogout = async () => {
    fetch(`https://www.atavismxi.com/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) {
          throw await res.json()
        }

        navigate(`/`, { replace: true })
      })
      .catch((error) => {
        console.error('Logout Fetch Failed. ', error)
        setErrors([...errors(), error.message])
      })
  }

  return (
    <>
      <Show
        when={!playersAdventurers.loading}
        fallback={<p>Loading Adventurers...</p>}
      >
        <h2 class='playerAdventurersTitle'>Your Adventurers</h2>
        <ul class='adventurerList'>
          <For each={playersAdventurers()}>
            {(adventurer) => {
              if (adventurer.message)
                return (
                  <li class='adventurerRow'>
                    <Adventurer />
                  </li>
                )
              return (
                <li
                  class='adventurerRow'
                  onClick={() =>
                    window.localStorage.setItem(
                      'detailsName',
                      adventurer.charname,
                    )
                  }
                >
                  <Adventurer {...adventurer} />
                </li>
              )
            }}
          </For>
        </ul>
      </Show>
      <div class='playerButtonContainer'>
        <Install />
        <Update />
        <Play
          playerName={playerName()}
          errors={errors()}
          setErrors={setErrors}
        />
        <button class='logoutButton' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div class='errorsContainer'>
        <For each={errors()}>{(error) => <p>{error}</p>}</For>
      </div>
    </>
  )
}
