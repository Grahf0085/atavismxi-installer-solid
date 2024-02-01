import { For, onMount } from 'solid-js'
import { adventurerImage } from '../../../utils/adventurerConversion'
import '../../styles/components/createAdventurer/faceSelection.css'

export function FaceSelection(props) {
  onMount(() => {
    props.setSelectedFace(props.facesToShow[0])
  })

  return (
    <section class='creationContainer'>
      <h2 class='creationTitle'>Select A Style</h2>
      <ul class='faceListContainer'>
        <For each={props.facesToShow}>
          {(face) => {
            const url = adventurerImage(face)
            return (
              <li
                class='faceListItem'
                onClick={() => props.setSelectedFace(face)}
                style={{
                  background:
                    props.selectedFace === face
                      ? 'var(--ternary-color)'
                      : 'var(--secondary-color)',
                }}
              >
                <img src={url} alt={`Picture of a ${props.selectedRace}`} />
              </li>
            )
          }}
        </For>
      </ul>
      <div class='creationButtonContainer'>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(0)}
        >
          Prev
        </button>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(2)}
        >
          Next
        </button>
      </div>
    </section>
  )
}
