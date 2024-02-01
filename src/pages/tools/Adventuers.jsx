import { For, createSignal, createResource, Show } from 'solid-js'
import { Select } from '@thisbeyond/solid-select'
import { createForm } from '@felte/solid'
import { Adventurer } from '../../components/adventurer/Adventurer'
import { jobConverter, zones } from '../../../utils/adventurerConversion.js'
import { fetchOnline } from '../../../utils/search'
import '@thisbeyond/solid-select/style.css'
import '../../styles/pages/tools/adventurers.css'

export function Adventurers() {
  const [selectedZone, setSelectedZone] = createSignal()
  const [selectedJob, setSelectedJob] = createSignal()
  const [fetchedByName, setFetchedByName] = createSignal()

  const [fetchedOnline] = createResource(
    () => [selectedZone(), selectedJob()],
    fetchOnline,
  )

  const { form, errors } = createForm({
    onSubmit: async (values) => {
      if (values.nameSearch === '') return []

      const searchResponse = await fetch(
        `https://www.atavismxi.com/api/adventurer/${values.nameSearch}`,
      )

      if (!searchResponse.ok) {
        throw await searchResponse.json()
      }

      const searchResults = await searchResponse.json()

      return searchResults
    },

    validate: (values) => {
      const errors = {}

      return errors
    },

    onSuccess(response) {
      setFetchedByName(response)
    },

    onError(err) {
      const errors = {}
      errors.serverError = err.errors
      return errors
    },
  })

  return (
    <div class='adventurersContainer'>
      <form class='adventurerForm' use:form>
        <label class='adventurerLabel'>
          Search By Name
          <input
            class='adventurerInput'
            type='text'
            placeholder='Find An Adventurer'
            name='nameSearch'
          />
        </label>
        <div class='adventurersButtonContainer'>
          <button
            type='reset'
            onClick={() => {
              setSelectedZone(undefined)
              setSelectedJob(undefined)
              setFetchedByName(undefined)
            }}
          >
            Reset
          </button>
          <button type='submit'>Search</button>
          <Show when={errors().serverError || fetchedOnline()?.errors?.errors}>
            <p>
              {errors().serverError} {fetchedOnline()?.errors?.errors}
            </p>
          </Show>
        </div>
        <Show
          when={fetchedByName() === undefined || fetchedByName()?.length === 0}
        >
          <div class='zoneSelectContainer'>
            <label class='adventurerLabel' for='zoneSelect'>
              Filter Online By Zone
            </label>
            <Select
              onChange={(e) => setSelectedZone(e)}
              class='custom'
              options={fetchedOnline()?.onlineZones}
              format={(item) => zones[item]}
              placeholder='Search A Zone'
              id='zoneSelect'
            />
          </div>
          <div class='jobSelectContainer'>
            <label class='adventurerLabel' for='jobSelect'>
              Filter Online By Job
            </label>
            <Select
              onChange={(e) => setSelectedJob(e)}
              class='custom'
              options={fetchedOnline()?.onlineJobs}
              format={(item) => jobConverter(item)}
              placeholder='Search A Job'
              id='jobSelect'
            />
          </div>
        </Show>
      </form>
      <div class='resultsContainer'>
        <Show
          when={fetchedByName() === undefined || fetchedByName()?.length === 0}
          fallback={
            <section>
              <h2 class='onlineTitle'>Search Results</h2>
              <ul>
                <For each={fetchedByName()}>
                  {(adventurer) => (
                    <li
                      class='adventurerRow'
                      onClick={() =>
                        window.localStorage.setItem(
                          'detailsName',
                          adventurer.charname,
                        )
                      }
                    >
                      <Adventurer {...adventurer} />
                    </li>
                  )}
                </For>
              </ul>
            </section>
          }
        >
          <section>
            <h2 class='onlineTitle'>Online</h2>
            <ul>
              <For each={fetchedOnline()?.adventurersOnline}>
                {(adventurer) => (
                  <li
                    class='adventurerRow'
                    onClick={() =>
                      window.localStorage.setItem(
                        'detailsName',
                        adventurer.charname,
                      )
                    }
                  >
                    <Adventurer {...adventurer} />
                  </li>
                )}
              </For>
            </ul>
          </section>
        </Show>
      </div>
    </div>
  )
}
