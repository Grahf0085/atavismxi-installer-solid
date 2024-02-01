import { createSignal } from 'solid-js'
import ChevronUpCircle from '../../node_modules/lucide-solid/dist/source/icons/chevron-up-circle'
import ChevronDownCircle from '../../node_modules/lucide-solid/dist/source/icons/chevron-down-circle'
import '../styles/components/aboutItem.css'

export function AboutItem(props) {
  const [active, setActive] = createSignal(false)
  return (
    <details class='aboutDetails'>
      <summary onClick={() => setActive(!active())} class='summary'>
        <h2 class='aboutTitle'>{props.title}</h2>
        <Show when={active()} fallback={<ChevronUpCircle class='upArrow' />}>
          <ChevronDownCircle class='downArrow' />
        </Show>
      </summary>
      <p>{props.text}</p>
    </details>
  )
}
