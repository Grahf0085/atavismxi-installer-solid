import { Show, createMemo, createSignal } from 'solid-js'
import { useLocation } from '@solidjs/router'
import ChevronUpCircle from '../../node_modules/lucide-solid/dist/source/icons/chevron-up-circle.jsx'
import XCircle from '../../node_modules/lucide-solid/dist/source/icons/x-circle.jsx'
import { OnlineCount } from './OnlineCount.jsx'
import '../styles/components/header.css'

export function Header(props) {
  const location = useLocation()
  const pathname = createMemo(() => location.pathname)

  const handleMobileMenuChange = () => {
    props.menuRef.classList.toggle('mobileMenuHide')
    props.openMenuButtonRef.classList.toggle('hidden')
    props.closeMenuButtonRef.classList.toggle('hidden')
  }

  return (
    <header class={`${pathname() === '/' ? 'headerTransparent' : ''}`}>
      <Show when={pathname() !== '/'} fallback={<h1></h1>}>
        <a href='/'>
          <h1 class='headerTitle'>Atavism XI</h1>
        </a>
      </Show>
      <OnlineCount />
      <button
        onClick={handleMobileMenuChange}
        ref={(el) => props.setOpenMenuButtonRef(el)}
        type='button'
        class='openMenuButton'
      >
        <ChevronUpCircle size='40' />
      </button>
      <button
        onClick={handleMobileMenuChange}
        ref={(el) => props.setCloseMenuButtonRef(el)}
        type='button'
        class='closeMenuButton hidden'
      >
        <XCircle size='40' />
      </button>
    </header>
  )
}
