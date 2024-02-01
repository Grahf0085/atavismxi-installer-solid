import { createResource } from 'solid-js'
import HelpCircle from '../../../node_modules/lucide-solid/dist/source/icons/help-circle.jsx'
import { fetchAdventurerDetails } from '../../../utils/adventurerDetails.js'
import '../../styles/components/adventurer/adventurer.css'

export function Adventurer(props) {
  const [fetchedDetails] = createResource(
    props.charname,
    fetchAdventurerDetails,
  )

  return (
    <a
      class='detailsLink'
      href={`${props.charname ? `/adventurer-details` : '/create-adventurer'}`}
    >
      <figure class='adventurerFigure'>
        <figcaption>
          <b>{props.charname || 'Comer'}</b>
        </figcaption>
        <Show
          when={fetchedDetails()?.fetchedImage}
          fallback={<HelpCircle size={80} />}
        >
          <img
            class='advImage'
            src={fetchedDetails()?.fetchedImage}
            alt={props.charname}
          />
        </Show>
        <span class='titleSpan'>
          <em>the</em> {fetchedDetails()?.title || 'future adventurer'}
        </span>
      </figure>

      <Show
        when={fetchedDetails()?.subJob}
        fallback={
          <div>
            {fetchedDetails()?.mainJob}
            {props.mlvl}
          </div>
        }
      >
        <div>
          {fetchedDetails()?.mainJob}
          {props.mlvl} /<br /> {fetchedDetails()?.subJob}
          {props.slvl}
        </div>
      </Show>
      <div class='adventurerLocation'>{fetchedDetails()?.translatedZone}</div>
    </a>
  )
}
