const formatRaceGenderForDb = (code) => {
  return { hm: 1, hf: 2, em: 3, ef: 4, tm: 5, tf: 6, mf: 7, gm: 8 }[code]
}

const formatFaceForDB = (code) => {
  const numberPart = parseInt(code)

  if (code.endsWith('a')) return (numberPart - 1) * 2

  if (code.endsWith('b')) return (numberPart - 1) * 2 + 1
}

export const formatFaceRaceForDb = (code) => {
  const face = formatFaceForDB(code.substring(2))
  const race = formatRaceGenderForDb(code.substring(0, 2))

  return { face, race }
}

const allJobPics = Object.values(
  import.meta.glob(`../src/assets/images/jobs/*.png`, { eager: true }),
)

export const jobs = [
  {
    id: 1,
    name: 'Warrior',
    description:
      'The Warrior is a formidable frontline fighter, specializing in the use of heavy armor and powerful melee weapons. As a master of close-quarters combat, the Warrior excels at absorbing damage and drawing the attention of enemies away from more vulnerable party members. With a focus on strength and endurance, Warriors can unleash devastating physical attacks and employ a variety of weapon skills to crush their foes.',
    pic: allJobPics[4].default,
  },
  {
    id: 2,
    name: 'Monk',
    description:
      'The Monk is a disciplined martial artist who relies on incredible physical prowess and hand-to-hand combat techniques. Masters of bare-handed fighting, Monks excel in delivering rapid, powerful blows and possess exceptional hit points, allowing them to play as heavy damage dealers while taking an occasional hit. Monks are formidable adversaries in close combat.',
    pic: allJobPics[1].default,
  },
  {
    id: 3,
    name: 'White Mage',
    description:
      'The White Mage is a master of restorative magic, specializing in healing and support spells. Clad in flowing white robes, White Mages are essential members of any adventuring party, providing essential recovery and protection. With spells ranging from basic cures to powerful resurrection magic, White Mages excel at keeping their allies alive in the face of adversity. Their abilities extend beyond healing, as they can also repel undead and provide protective enhancements to the party.',
    pic: allJobPics[5].default,
  },
  {
    id: 4,
    name: 'Black Mage',
    description:
      'The Black Mage is a master of destructive elemental magic, harnessing the power of fire, ice, and lightning to obliterate enemies from a distance. Cloaked in distinctive black attire, Black Mages are formidable spellcasters who can unleash devastating area-of-effect spells and single-target nukes. While physically frail, their magical prowess makes them indispensable in dealing immense damage to adversaries. Black Mages can also manipulate the elements to weaken and control their foes.',
    pic: allJobPics[0].default,
  },
  {
    id: 5,
    name: 'Red Mage',
    description:
      'The Red Mage is a versatile spellcaster adept at both black and white magic, as well as wielding a sword in combat. Distinguished by their dual-casting abilities, Red Mages seamlessly blend offensive and defensive spells with melee combat. With a distinctive red and black ensemble, Red Mages are well-suited for a supportive role in a party, providing healing when needed and unleashing powerful elemental spells or sword techniques to dispatch foes. Their adaptability makes them valuable assets in various party compositions.',
    pic: allJobPics[2].default,
  },
  {
    id: 6,
    name: 'Thief',
    description:
      'The Thief is a nimble and agile rogue, skilled in stealth and larceny. With a focus on evasion and precision strikes, Thieves are adept at slipping past enemies undetected and unleashing sneak attacks. In addition to their combat skills, Thieves possess a unique ability to "Steal" items from opponents, providing valuable resources for themselves and their party. Thieves are also known for their lockpicking skills and can open treasure chests that others may find inaccessible.',
    pic: allJobPics[3].default,
  },
]

export const pickStartingZone = (nation) => {
  if (nation === 0) return 230 + Math.floor(Math.random() * 3)
  if (nation === 1) return 234 + Math.floor(Math.random() * 3)
  if (nation === 2) {
    let zone
    do {
      zone = 238 + Math.floor(Math.random() * 3)
    } while (zone === 239)
    return zone
  }
}
