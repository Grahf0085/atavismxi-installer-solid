import { Show } from 'solid-js'
import { Transition } from 'solid-transition-group'

export function Animate(props) {
  return (
    <Transition
      onEnter={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 600,
        })
        a.finished.then(done)
      }}
      onExit={(el, done) => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 0,
        })
        a.finished.then(done)
      }}
    >
      <Show when={props.showWhen === true}>{props.component}</Show>
    </Transition>
  )
}
