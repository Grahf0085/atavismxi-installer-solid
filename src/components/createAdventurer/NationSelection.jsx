import { For } from 'solid-js'
import { nationEmblems } from '../../../utils/adventurerDetails'
import bastokVideo from '../../assets/video/bastok.webm'
import sandoriaVideo from '../../assets/video/sandoria.webm'
import windurstVideo from '../../assets/video/windurst.webm'
import '../../styles/components/createAdventurer/nationSelection.css'

export function NationSelection(props) {
  const videos = [sandoriaVideo, bastokVideo, windurstVideo]
  const descriptions = [
    `San d'Oria. The Elvaan, a proud race of warriors, forged this Kingdom in Northern Quon from the fires of civil war. House d'Oraguille has ruled from the fortress city of San d'Oria for over five hundred years. Two elite chivalric orders keep watch over the kingdom. The Royal Knights patrol its borders, while the Temple Knights maintain peace within the capital. Thanks to their vigilance, no army has ever breached the city walls.`,
    `Bastok. This nation was established in southern Quon by the Humes, a people with great technological ingenuity. The president is elected by popular vote. Once a small mining town, the capital city of Bastok prospered when mithril was discovered in the surrounding mountains. In time, it grew into the great industrial power it is today. And in the southern part of the capital lived the mighty Galka. They tirelessly work the minds and forges that drive Bastok's economy`,
    `Windurst. Tribes of TaruTaru from the sweeping grasslands and neighboring islands of Southern Mindartia united to form this league of states. It is governed by a council of representatives from the five ministries of magic, legacies of the five founding tribes. Their decisions are based on the prophecies of the mystic Star Sibyl. The capital, Windiest City, was razed in the war 20 years ago, but this prominent center of learning has since been restored to its former glory.`,
  ]

  return (
    <section class='creationContainer'>
      {/* <video */}
      {/*   class='nationVideo' */}
      {/*   src={videos[props.selectedNation]} */}
      {/*   muted */}
      {/*   loop */}
      {/*   autoplay */}
      {/* /> */}
      <h2 class='creationTitle'>Select A Home</h2>
      <div class='nationSubContainer'>
        <ul class='nationEmblemContainer'>
          <For each={nationEmblems}>
            {(emblem, index) => (
              <li
                class='nationListItem'
                style={{
                  background:
                    props.selectedNation === index()
                      ? 'var(--ternary-color)'
                      : 'var(--secondary-color)',
                }}
              >
                <img
                  onClick={() => props.setSelectedNation(index())}
                  class='nationSelectionEmblem'
                  src={emblem.pic}
                  alt={emblem.alt}
                />
              </li>
            )}
          </For>
        </ul>
        <p class='nationDescription'>{descriptions[props.selectedNation]}</p>
      </div>
      <div class='creationButtonContainer'>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(3)}
        >
          Prev
        </button>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(5)}
        >
          Next
        </button>
      </div>
    </section>
  )
}
