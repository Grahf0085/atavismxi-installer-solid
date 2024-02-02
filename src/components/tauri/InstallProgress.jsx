import { createEffect } from 'solid-js'
import '../../styles/components/tauri/installProgress.css'

export function InstallProgress(props) {
  let fillRef

  createEffect(() => {
    fillRef.style.width = props.progress + '%'
  })

  return (
    <div class='progress-bar'>
      <span class='progress-bar-fill' ref={fillRef}></span>
      <span class='progress-text'>
        {props.title} {props.progress + '%'}
      </span>
    </div>
  )
}
