import { For } from 'solid-js'
import '../../styles/components/adventurer/crafts.css'

export function Crafts(props) {
  return (
    <figure class='craftFigure'>
      <figcaption>
        <h3 class='craftsTitle'>Crafts</h3>
      </figcaption>
      <ul class='craftsContainer'>
        <For each={props.crafts}>
          {(craft) => (
            <li>
              <figure class='craftTitle'>
                <img class='craftImage' src={craft.pic} alt={craft.alt} />
                <figcaption class='craftLevel'>{craft.level / 10}</figcaption>
              </figure>
            </li>
          )}
        </For>
      </ul>
    </figure>
  )
}
