import { For } from 'solid-js'
import '../styles/pages/support.css'

export function Support() {
  const waysOfSupports = [
    {
      title: 'Discord',
      text: 'Reach out in <a href="https://discord.gg/Hpe657nmGu">Discord</a> and I can address your issue as soon as possible.',
    },
    {
      title: 'Bug Reports',
      text: 'Submit a <a href="https://gitlab.com/Grahf0085/AtavismXI/-/issues"> bug report</a>. Might be best to check Air Sky Boat or Horizon bug reports first.',
    },
    {
      title: 'Unfreeze Yourself',
      text: 'Game hung or crashed during a cutscene or during dialogue? Type "!release"',
    },
    {
      title: 'Black List Someone',
      text: 'Player harassed you? Use "/blacklist"',
    },
  ]
  return (
    <section>
      <h2 class='supportTitle'>Limited Support Options</h2>
      <ul class='supportList'>
        <For each={waysOfSupports}>
          {(wayOfSupport) => (
            <li class='supportItem'>
              <h3 class='supportItemTitle'>{wayOfSupport.title}</h3>
              <p class='supportItemText' innerHTML={wayOfSupport.text} />
            </li>
          )}
        </For>
      </ul>
    </section>
  )
}
