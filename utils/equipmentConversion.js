export const capitalizeWords = (name) =>
  name
    .split('_')
    .map((el) => `${el[0].toUpperCase()}${el.slice(1)}`)
    .join(' ')

const jobs = {
  WAR: 1,
  MNK: 2,
  WHM: 4,
  BLM: 8,
  RDM: 16,
  THF: 32,
  PLD: 64,
  DRK: 128,
  BST: 256,
  BRD: 512,
  RNG: 1024,
  SAM: 2048,
  NIN: 4096,
  DRG: 8192,
  SMN: 16384,
  BLU: 32768,
  COR: 65536,
  PUP: 131072,
  DNC: 262144,
  SCH: 524288,
  GEO: 1048576,
  RUN: 2097152,
}

const excludedJobs = ['BLU', 'COR', 'PUP', 'DNC', 'SCH', 'GEO', 'RUN']

const translateJobs = (number) => {
  const keys = []

  for (const [job, value] of Object.entries(jobs)) {
    if (number & value) {
      keys.push(job)
    }
  }

  return keys
}

export const jobsCanUseItem = (jobNumber) => {
  if (jobNumber === 4194303) return ['All Jobs']
  return translateJobs(jobNumber).filter((job) => !excludedJobs.includes(job))
}

export const weaponTypes = {
  0: 'None',
  1: 'Hand-to-Hand',
  2: 'Dagger',
  3: 'Sword',
  4: 'Great Sword',
  5: 'Axe',
  6: 'Great Scythe',
  7: 'Scythe',
  8: 'Polearm',
  9: 'Katana',
  10: 'Great Katana',
  11: 'Club',
  12: 'Staff',
}

export const races = {
  1: 'Hume M',
  2: 'Hume F',
  3: 'H',
  4: 'Elvaan M',
  8: 'Elvaan F',
  12: 'E',
  16: 'Taru M',
  32: 'Taru F',
  48: 'T',
  64: 'M',
  106: 'All Female',
  128: 'G',
  149: 'All Male',
  255: 'All Races',
}
