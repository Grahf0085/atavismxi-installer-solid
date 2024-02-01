export const fetchOnline = async (searchProps) => {
  const selectedZone = searchProps[0]
  const selectedJob = searchProps[1]

  try {
    const response = await fetch(
      `https://www.atavismxi.com/api/adventurer/online`,
    )

    if (!response.ok) {
      throw await response.json()
    }
    let adventurersOnline = await response.json()

    const onlineZones = adventurersOnline.map(
      (adventurer) => adventurer.pos_zone,
    )
    const onlineJobs = adventurersOnline.map((adventurer) => adventurer.mjob)

    if (selectedZone !== undefined)
      adventurersOnline = adventurersOnline.filter(
        (adventurer) => adventurer.pos_zone === selectedZone,
      )
    if (selectedJob !== undefined)
      adventurersOnline = adventurersOnline.filter(
        (adventurer) => adventurer.mjob === selectedJob,
      )

    const errors = undefined

    return { adventurersOnline, onlineZones, onlineJobs, errors }
  } catch (error) {
    console.error('Error Fetching Adventurers Online: ', error)
    const errors = error
    return { adventurersOnline: [], onlineZones: [], onlineJobs: [], errors }
  }
}

export const fetchRecipes = async (craft) => {
  try {
    const response = await fetch(`https://www.atavismxi.com/api/craft/${craft}`)

    if (!response.ok) {
      throw await response.json()
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error Fetching Recipes: ', error)
    return error.errors.sqlMessage
  }
}

export const fetchPlayerAdventurers = async (playerId) => {
  try {
    let characterSlots = [
      { message: 'Create an Adventurer' },
      { message: 'Create an Adventurer' },
      { message: 'Create an Adventurer' },
    ]

    const response = await fetch(
      `https://www.atavismxi.com/api/player/adventurers/${playerId}`,
    )

    if (!response.ok) {
      throw await response.json()
    }

    const playersAdventurers = await response.json()

    playersAdventurers?.forEach((adventurer, index) => {
      characterSlots[index] = adventurer
    })

    return characterSlots
  } catch (error) {
    console.error('Error Getting Players Adventurers: ', error)
    return error.errors.sqlMessage
  }
}
