import { createSignal, For, onCleanup, onMount } from 'solid-js'
import { raceProfiles } from '../../../utils/races'
import '../../styles/components/createAdventurer/raceSelection.css'

export function RaceSelection(props) {
  let intersectionObserver
  let raceListElement

  const [description, setDescription] = createSignal(
    raceProfiles[0].description,
  )

  const intersectionObserverOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 0.7, // visible amount of item shown in relation to root
  }

  const intersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        props.setSelectedRace(entry.target.getAttribute('data-race'))
        setDescription(entry.target.getAttribute('data-description'))
      }
    })
  }

  onMount(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      intersectionObserver = new IntersectionObserver(
        intersectionObserverCallback,
        intersectionObserverOptions,
      )
      raceListElement = document.querySelectorAll('.raceListItem')
      raceListElement.forEach((item) => intersectionObserver.observe(item))
    }
  })

  onCleanup(() => {
    if (intersectionObserver) intersectionObserver.disconnect()
  })

  return (
    <section class='creationContainer'>
      <h2 class='creationTitle'>Select A Race</h2>
      <ul class='raceListContainer'>
        <For each={raceProfiles}>
          {(race) => (
            <li
              data-race={race.race}
              data-description={race.description}
              class='raceListItem'
              onClick={() => {
                props.setSelectedRace(race.race)
                setDescription(race.description)
              }}
              style={{
                background:
                  props.selectedRace === race.race
                    ? 'var(--ternary-color)'
                    : 'var(--secondary-color)',
              }}
            >
              <img class='raceImg' src={race.pic} alt={race.alt} />
            </li>
          )}
        </For>
      </ul>
      <p class='raceDesc'>{description()}</p>
      <div class='creationButtonContainer'>
        <button class='creationButton' onClick={() => props.setStep(1)}>
          Next
        </button>
      </div>
    </section>
  )
}
