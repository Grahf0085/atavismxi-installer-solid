import { createSignal } from 'solid-js'
import { WeaponModal } from './WeaponModal.jsx'
import { ArmorModal } from './ArmorModal.jsx'
import '../../../styles/components/adventurer/equipment/equipmentItem.css'

export function EquipmentItem(props) {
  const [hovered, setHovered] = createSignal(false)

  return (
    <div class='equipmentItemContainer'>
      <img
        onMouseEnter={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        class='equipmentImage'
        src={props.ahImage}
        alt='picture of a piece of equipment adventurer is wearing'
      />
      <Show when={hovered() && props.isWeapon}>
        <WeaponModal weaponId={props.itemId} />
      </Show>
      <Show when={hovered() && !props.isWeapon}>
        <ArmorModal armorId={props.itemId} slot={props.slot} />
      </Show>
    </div>
  )
}
