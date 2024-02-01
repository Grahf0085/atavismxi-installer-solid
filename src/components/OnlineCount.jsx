import { Show, createResource } from 'solid-js'
import { fetchOnline } from '../../utils/search'

export function OnlineCount() {
  const [numberOnline] = createResource(fetchOnline)

  return (
    <Show when={numberOnline()} fallback={<div>Loading Number Online</div>}>
      <div>
        <a href='/tools/adventurers'>
          {numberOnline().adventurersOnline.length} Online
        </a>
        <Show when={numberOnline()?.errors}>
          <p>{numberOnline().errors.errors}</p>
        </Show>
      </div>
    </Show>
  )
}
