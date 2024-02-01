import { For } from 'solid-js'
import '../../styles/components/adventurer/nations.css'

export function Nations(props) {
  return (
    <div class='nationContainer'>
      <For each={props.nations}>
        {(nation) => (
          <figure class='nationFigure'>
            <img class='nationEmblem' src={nation.pic} alt={nation.alt} />
            <figcaption class='nationRank'>{nation.rank}</figcaption>
          </figure>
        )}
      </For>
    </div>
  )
}
