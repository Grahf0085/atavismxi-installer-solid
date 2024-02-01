import { For } from 'solid-js'
import '../../styles/components/createAdventurer/sizeSelection.css'

export function SizeSelection(props) {
  const allRaceSizes = Object.values(
    import.meta.glob(`../../../src/assets/images/races/sizes/*.png`, {
      eager: true,
    }),
  )

  const filteredByRace = allRaceSizes.filter((picUrl) => {
    const pattern = new RegExp(`${props.selectedFace}[SML]{1}.*png`, 'g')
    return pattern.test(picUrl.default)
  })

  const filteredByRaceSmallestToLargest = filteredByRace.reverse()

  const sizes = ['small', 'medium', 'large']

  return (
    <section class='creationContainer'>
      <h2 class='creationTitle sizeTitle'>Select A Size</h2>
      <p class='sizeDisclaimer'>
        (model is random and for the purpose of size comparison only)
      </p>
      <ul class='sizeListContainer'>
        <For each={filteredByRaceSmallestToLargest}>
          {(pic, index) => (
            <li
              class='sizeListItem'
              onClick={() => props.setSelectedSize(index)}
              style={{
                background:
                  props.selectedSize === index()
                    ? 'var(--ternary-color)'
                    : 'var(--secondary-color)',
              }}
            >
              <img
                src={pic.default}
                alt={`Picture of ${sizes[index()]} ${props.selectedRace}`}
              />
            </li>
          )}
        </For>
      </ul>
      <div class='creationButtonContainer'>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(1)}
        >
          Prev
        </button>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(3)}
        >
          Next
        </button>
      </div>
    </section>
  )
}
