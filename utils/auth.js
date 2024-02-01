export async function getPlayer() {
  try {
    const results = await fetch(`https://www.atavismxi.com/api/player/info`, {
      method: 'GET',
      credentials: 'include',
    })
    if (results.status === 204) {
      return
    } else {
      const player = await results.json()
      return player
    }
  } catch (error) {
    console.error('Error Getting Player: ', error)
    throw error
  }
}
