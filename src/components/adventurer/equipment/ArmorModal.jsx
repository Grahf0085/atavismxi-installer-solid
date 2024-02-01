import { createResource, Show } from 'solid-js'
import { fetchArmorDetails } from '../../../../utils/equipment.js'
import { itemDescriptions } from '../../../../utils/itemDescriptions.js'
import '../../../styles/components/adventurer/equipment/itemModal.css'

export function ArmorModal(props) {
  const [fetchedArmorDetails] = createResource(props.armorId, fetchArmorDetails)

  return (
    <Show when={!fetchedArmorDetails.loading}>
      <figure class='itemFigure'>
        <img
          class='itemImage'
          src={`https://static.ffxiah.com/images/icon/${props.armorId}.png`}
        />
        <figcaption class='itemFigcaption'>
          <p>{fetchedArmorDetails().armorName}</p>
          <p>
            [{props.slot}] {fetchedArmorDetails().armorRace}
          </p>
          <p class='itemDescription'>{itemDescriptions[props.armorId]}</p>
          <p>
            Lv. {fetchedArmorDetails().armorLevel}{' '}
            {fetchedArmorDetails().armorJobs}
          </p>
        </figcaption>
      </figure>
    </Show>
  )
}
