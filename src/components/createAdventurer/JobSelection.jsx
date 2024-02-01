import { For, onCleanup, onMount } from 'solid-js'
import { jobs } from '../../../utils/createAdventurer'
import '../../styles/components/createAdventurer/jobSelection.css'

export function JobSelection(props) {
  let jobIntersectionObserver
  let jobListElement

  const intersectionObserverOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 0.5, // visible amount of item shown in relation to root
  }

  const intersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        props.setSelectedJob(parseInt(entry.target.getAttribute('data-job')))
      }
    })
  }

  onMount(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      jobIntersectionObserver = new IntersectionObserver(
        intersectionObserverCallback,
        intersectionObserverOptions,
      )
      jobListElement = document.querySelectorAll('.jobListItem')
      jobListElement.forEach((item) => jobIntersectionObserver.observe(item))
    }
  })

  onCleanup(() => {
    if (jobIntersectionObserver) jobIntersectionObserver.disconnect()
  })

  return (
    <section class='creationContainer'>
      <h2 class='creationTitle'>Select A Career</h2>
      <ul class='jobsListContainer'>
        <For each={jobs}>
          {(job) => (
            <li
              class='jobListItem'
              data-job={job.id}
              onClick={() => props.setSelectedJob(job.id)}
              style={{
                background:
                  props.selectedJob === job.id
                    ? 'var(--ternary-color)'
                    : 'var(--secondary-color)',
              }}
            >
              <figure class='jobFigure'>
                <figcaption>{job.name}</figcaption>
                <img class='jobImage' src={job.pic} alt={job.name} />
                <p>{job.description}</p>
              </figure>
            </li>
          )}
        </For>
      </ul>
      <div class='creationButtonContainer'>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(2)}
        >
          Prev
        </button>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(4)}
        >
          Next
        </button>
      </div>
    </section>
  )
}
