import { For, createResource } from 'solid-js'
import { fetchEquipment } from '../../../../utils/equipment.js'
import { EquipmentItem } from './EquipmentItem.jsx'
import '../../../styles/components/adventurer/equipment/equipment.css'

export function Equipment(props) {
  const [fetchedEquipment] = createResource(props.name, fetchEquipment)

  return (
    <div class='equipmentGrid'>
      <h3 class='equipmentTitle'>Equipment</h3>
      <For each={fetchedEquipment()}>
        {(equipment, index) => (
          <div class={`equip-slot-${index()}`}>
            {equipment.itemId ? (
              <EquipmentItem
                ahImage={`https://static.ffxiah.com/images/icon/${equipment.itemId}.png`}
                itemId={equipment.itemId}
                isWeapon={index() === 0}
                slot={equipment[index()]}
              />
            ) : (
              equipment[index()]
            )}
          </div>
        )}
      </For>
    </div>
  )
}
