import {
  jobConverter,
  formatAdventurer,
  adventurerImage,
  zones,
} from './adventurerConversion'

import bastokEmblem from '../src/assets/images/nations/bastok.webp'
import sandoriaEmblem from '../src/assets/images/nations/sandoria.webp'
import windurstEmblem from '../src/assets/images/nations/windurst.webp'

import fishingEmblem from '../src/assets/images/crafting/fish.webp'
import woodworkingEmblem from '../src/assets/images/crafting/wood.webp'
import smithingEmblem from '../src/assets/images/crafting/smith.webp'
import goldsmithingEmblem from '../src/assets/images/crafting/gold.webp'
import weavingEmblem from '../src/assets/images/crafting/weave.webp'
import leathercraftEmblem from '../src/assets/images/crafting/leather.webp'
import bonecraftEmblem from '../src/assets/images/crafting/bone.webp'
import alchemyEmblem from '../src/assets/images/crafting/alchemy.webp'
import cookingEmblem from '../src/assets/images/crafting/cook.webp'
import diggingEmblem from '../src/assets/images/crafting/dig.webp'

import { titles } from './titles.js'

export const nationEmblems = [
  { pic: sandoriaEmblem, alt: 'Emblem of Sandoria' },
  { pic: bastokEmblem, alt: 'Emblem of Bastok' },
  { pic: windurstEmblem, alt: 'Emblem of Windurst' },
]

const emptyAdventurer = {
  accountId: '',
  charId: '',
  charName: '',
  mainLevel: '',
  subLevel: '',
  mainJob: '',
  subJob: '',
  fetchedImage: '',
  title: '',
  nations: '',
  jobs: '',
  crafts: '',
  translatedZone: '',
}

export const fetchAdventurerDetails = async (name) => {
  if (!name) return emptyAdventurer
  try {
    const response = await fetch(
      `https://www.atavismxi.com/api/adventurer/${name}`,
    )

    if (!response.ok) {
      throw await response.json()
    }
    const allAdventurerDetails = await response.json()

    /* I think this should always be the right adventurer */
    const adventurerDetails = allAdventurerDetails[0]

    const accountId = adventurerDetails?.accid
    const charId = adventurerDetails?.charid
    const charName = adventurerDetails?.charname
    const mainLevel = adventurerDetails?.mlvl
    const subLevel = adventurerDetails?.slvl
    const mainJob = jobConverter(adventurerDetails?.mjob)
    const subJob = jobConverter(adventurerDetails?.sjob)

    const formattedAdventurer = formatAdventurer(
      adventurerDetails?.race,
      adventurerDetails?.face,
    )

    const fetchedImage = adventurerImage(formattedAdventurer)
    const title = titles[adventurerDetails?.title]
    const translatedZone = zones[adventurerDetails?.pos_zone]

    const nations = [
      {
        rank: adventurerDetails?.rankSandoria,
        pic: nationEmblems[0].pic,
        alt: nationEmblems[0].alt,
      },
      {
        rank: adventurerDetails?.rankBastok,
        pic: nationEmblems[1].pic,
        alt: nationEmblems[1].alt,
      },
      {
        rank: adventurerDetails?.rankWindurst,
        pic: nationEmblems[2].pic,
        alt: nationEmblems[2].alt,
      },
    ]

    const jobs = [
      {
        job: 'WAR',
        level: adventurerDetails?.war,
      },
      {
        job: 'MNK',
        level: adventurerDetails?.mnk,
      },
      {
        job: 'WHM',
        level: adventurerDetails?.whm,
      },
      {
        job: 'BLM',
        level: adventurerDetails?.blm,
      },
      {
        job: 'RDM',
        level: adventurerDetails?.rdm,
      },
      {
        job: 'THF',
        level: adventurerDetails?.thf,
      },
      {
        job: 'PLD',
        level: adventurerDetails?.pld,
      },
      {
        job: 'DRK',
        level: adventurerDetails?.drk,
      },
      {
        job: 'BST',
        level: adventurerDetails?.bst,
      },
      {
        job: 'BRD',
        level: adventurerDetails?.brd,
      },
      {
        job: 'RNG',
        level: adventurerDetails?.rng,
      },
      {
        job: 'SAM',
        level: adventurerDetails?.sam,
      },
      {
        job: 'NIN',
        level: adventurerDetails?.nin,
      },
      {
        job: 'DRG',
        level: adventurerDetails?.drg,
      },
      {
        job: 'SMN',
        level: adventurerDetails?.smn,
      },
    ]

    const crafts = [
      {
        title: 'Fishing',
        pic: fishingEmblem,
        alt: 'Fishing Guild Emblem',
        level: adventurerDetails?.fishing || 0,
      },
      {
        title: 'Woodworking',
        pic: woodworkingEmblem,
        alt: 'Woodworking Guild Emblem',
        level: adventurerDetails?.woodworking || 0,
      },
      {
        title: 'Smithing',
        pic: smithingEmblem,
        alt: 'Smithing Guild Emblem',
        level: adventurerDetails?.smithing || 0,
      },
      {
        title: 'Goldsmithing',
        pic: goldsmithingEmblem,
        alt: 'Goldsmithing Guild Emblem',
        level: adventurerDetails?.goldsmithing || 0,
      },
      {
        title: 'Clothcraft',
        pic: weavingEmblem,
        alt: 'Clothcraft Guild Emblem',
        level: adventurerDetails?.weaving || 0,
      },
      {
        title: 'Leathercraft',
        pic: leathercraftEmblem,
        alt: 'Leathercraft Guild Emblem',
        level: adventurerDetails?.leathercraft || 0,
      },
      {
        title: 'Bonecraft',
        pic: bonecraftEmblem,
        alt: 'Bonecraft Guild Emblem',
        level: adventurerDetails?.bonecraft || 0,
      },
      {
        title: 'Alchemy',
        pic: alchemyEmblem,
        alt: 'Alchemy Guild Emblem',
        level: adventurerDetails?.alchemy || 0,
      },
      {
        title: 'Cooking',
        pic: cookingEmblem,
        alt: 'Cooking Guild Emblem',
        level: adventurerDetails?.cooking || 0,
      },
      {
        title: 'Digging',
        pic: diggingEmblem,
        alt: 'Digging Guild Emblem',
        level: adventurerDetails?.digging || 0,
      },
    ]

    return {
      accountId,
      charId,
      charName,
      mainLevel,
      subLevel,
      mainJob,
      subJob,
      fetchedImage,
      title,
      nations,
      jobs,
      crafts,
      translatedZone,
    }
  } catch (error) {
    console.error('Error Fetching Adventurer Details: ', error)
    return emptyAdventurer
  }
}
