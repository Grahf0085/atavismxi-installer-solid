import '../../styles/components/adventurer/jobs.css'

export function Jobs(props) {
  return (
    <figure class='jobsFigure'>
      <figcaption>
        <h3 class='jobsTitle'>Jobs</h3>
      </figcaption>
      <ul class='jobsContainer'>
        <For each={props.jobs}>
          {(occupation) => (
            <li>
              <p class='jobTitle'>
                {occupation.job}
                <span class='jobLevel'>{occupation.level}</span>
              </p>
            </li>
          )}
        </For>
      </ul>
    </figure>
  )
}
