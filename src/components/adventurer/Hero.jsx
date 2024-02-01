import '../../styles/components/adventurer/hero.css'

export function Hero(props) {
  return (
    <figure class='profileHeader'>
      <figcaption>
        <h2 class='heroTitle'>
          {props.charName}
          {', '}
        </h2>
        <span class='titleSpan'>
          <em>the</em> {props.title}
        </span>
      </figcaption>
      <img
        class='adventurerImage'
        src={props.fetchedImage}
        alt={props.charName}
      />
      <p>
        {props.mainJob}
        {props.mainLevel}
        {props.subJob && `/${props.subJob}${props.subLevel}`}
      </p>
    </figure>
  )
}
