import { createResource, Show } from 'solid-js'
import { fetchWeaponDetails } from '../../../../utils/equipment.js'
import { itemDescriptions } from '../../../../utils/itemDescriptions.js'

export function WeaponModal(props) {
  const [fetchedWeaponDetails] = createResource(
    props.weaponId,
    fetchWeaponDetails,
  )

  return (
    <Show when={!fetchedWeaponDetails.loading}>
      <figure class='itemFigure'>
        <img
          class='itemImage'
          src={`https://static.ffxiah.com/images/icon/${props.weaponId}.png`}
          alt={`picture of ${fetchedWeaponDetails().weaponName}`}
        />
        <figcaption class='itemFigcaption'>
          <p>{fetchedWeaponDetails().weaponName}</p>
          <p>
            ({fetchedWeaponDetails().weaponType}){' '}
            {fetchedWeaponDetails().weaponRace}
          </p>
          <p class='itemDescription'>{itemDescriptions[props.weaponId]}</p>
          <p>
            Lv. {fetchedWeaponDetails().weaponLevel}{' '}
            {fetchedWeaponDetails().weaponJobs}
          </p>
        </figcaption>
      </figure>
    </Show>
  )
}
