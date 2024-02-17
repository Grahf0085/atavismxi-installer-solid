import { Show, createResource, onCleanup } from 'solid-js'
import { fetchOnline } from '../../utils/search'

export function OnlineCount() {
  const [numberOnline, { refetch }] = createResource(fetchOnline)

  const timer = setInterval(() => {
    refetch()
  }, 3000)

  onCleanup(() => clearInterval(timer))

  return (
    <Show when={numberOnline()} fallback={<div>Loading Number Online</div>}>
      <div>
        <a href='/tools/adventurers'>
          {numberOnline().adventurersOnline.length} Online
        </a>
        {/* this probably doesn't work */}
        <Show when={numberOnline?.error}>
          <p>{numberOnline.error.errors}</p>
        </Show>
      </div>
    </Show>
  )
}
