import {
  capitalizeWords,
  weaponTypes,
  races,
  jobsCanUseItem,
} from './equipmentConversion'

export const fetchEquipment = async (name) => {
  const slots = [
    { 0: 'Weapon', itemId: null },
    { 1: 'Shield', itemId: null },
    { 2: 'Range', itemId: null },
    { 3: 'Ammo', itemId: null },
    { 4: 'Head', itemId: null },
    { 5: 'Body', itemId: null },
    { 6: 'Hands', itemId: null },
    { 7: 'Legs', itemId: null },
    { 8: 'Feet', itemId: null },
    { 9: 'Neck', itemId: null },
    { 10: 'Waist', itemId: null },
    { 11: 'Ear 1', itemId: null },
    { 12: 'Ear 2', itemId: null },
    { 13: 'Ring 1', itemId: null },
    { 14: 'Ring 2', itemId: null },
    { 15: 'Back', itemId: null },
  ]

  if (!name) return slots

  const response = await fetch(
    `https://www.atavismxi.com/api/adventurer/equipment/${name}`,
  )

  const fetchedEquipment = await response.json()

  for (const equipment of fetchedEquipment) {
    const equipslotid = equipment.equipslotid
    const index = slots.findIndex((entry) => entry[equipslotid] !== undefined)
    if (index !== -1 && equipment.itemid !== 65535) {
      slots[index].itemId = equipment.itemid
    }
  }

  return slots
}

export const fetchWeaponDetails = async (weaponId) => {
  const response = await fetch(
    `https://www.atavismxi.com/api/adventurer/equipment/weapon/${weaponId}`,
  )
  const fetchedWeapon = await response.json()

  const weaponName = capitalizeWords(fetchedWeapon.name)
  const weaponType = weaponTypes[fetchedWeapon.skill]
  const weaponRace = races[fetchedWeapon.race]
  const weaponLevel = fetchedWeapon.level
  const weaponJobs = jobsCanUseItem(fetchedWeapon.jobs)
    .toString()
    .replaceAll(',', '/')

  return {
    weaponName,
    weaponType,
    weaponRace,
    weaponLevel,
    weaponJobs,
  }
}

export const fetchArmorDetails = async (armorId) => {
  const response = await fetch(
    `https://www.atavismxi.com/api/adventurer/equipment/armor/${armorId}`,
  )
  const fetchedArmor = await response.json()

  const armorName = capitalizeWords(fetchedArmor.name)
  const armorRace = races[fetchedArmor.race]
  const armorLevel = fetchedArmor.level
  const armorJobs = jobsCanUseItem(fetchedArmor.jobs)
    .toString()
    .replaceAll(',', '/')

  return {
    armorName,
    armorRace,
    armorLevel,
    armorJobs,
  }
}
