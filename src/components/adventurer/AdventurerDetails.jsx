import { createEffect, createResource, createSignal } from 'solid-js'
import { fetchAdventurerDetails } from '../../../utils/adventurerDetails.js'
import { Hero } from './Hero'
import { Nations } from './Nations'
import { Equipment } from './equipment/Equipment'
import { Jobs } from './Jobs.jsx'
import { Crafts } from './Crafts.jsx'
import { Delete } from './Delete.jsx'
import '../../styles/components/adventurer/adventurerDetails.css'

export function AdventurerDetails() {
  const [realName, setRealName] = createSignal()

  createEffect(() => setRealName(window.localStorage.getItem('detailsName')))

  const [fetchedDetails] = createResource(realName, fetchAdventurerDetails)

  return (
    <Show when={!fetchedDetails.loading}>
      <div class='detailsContainer'>
        <Hero
          charName={fetchedDetails()?.charName}
          title={fetchedDetails()?.title}
          fetchedImage={fetchedDetails()?.fetchedImage}
          mainJob={fetchedDetails()?.mainJob}
          subJob={fetchedDetails()?.subJob}
          mainLevel={fetchedDetails()?.mainLevel}
          subLevel={fetchedDetails()?.subLevel}
        />

        <Nations nations={fetchedDetails()?.nations} />

        <div class='infoContainer'>
          <Equipment name={fetchedDetails()?.charName} />

          <Jobs jobs={fetchedDetails()?.jobs} />

          <Crafts crafts={fetchedDetails()?.crafts} />
        </div>

        <Delete
          charName={fetchedDetails()?.charName}
          charAccountId={fetchedDetails()?.accountId}
          charId={fetchedDetails()?.charId}
        />
      </div>
    </Show>
  )
}
