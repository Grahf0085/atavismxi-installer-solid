import { useLocation } from '@solidjs/router'
import { For, createEffect, createMemo, createSignal } from 'solid-js'
import { Theme } from './Theme'
import '../styles/components/nav.css'

export function Nav(props) {
  let toolsRef

  const [toolRef, setToolRef] = createSignal()

  const location = useLocation()
  const currentPath = createMemo(() => location.pathname)

  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'Account', url: '/account' },
    { name: 'About', url: '/about' },
    { name: 'Support', url: '/support' },
    { name: 'Rules', url: '/rules' },
    { name: 'Tools', url: undefined },
    { name: 'Links', url: '/links' },
  ]

  const toggleMobileMenu = () => {
    props.menuRef.classList.toggle('mobileMenuHide')
    props.openMenuButtonRef.classList.toggle('hidden')
    props.closeMenuButtonRef.classList.toggle('hidden')
  }

  createEffect(() => {
    toolsRef.addEventListener('mouseleave', () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        toolsRef.replaceWith(toolRef())
      }
    })
  })

  return (
    <div class='navContainer'>
      <nav class='menu mobileMenuHide' ref={(el) => props.setMenuRef(el)}>
        <Theme />
        <For each={navItems}>
          {(navItem) => (
            <a
              ref={(el) => {
                if (navItem.name === 'Tools') {
                  setToolRef(el)
                }
              }}
              onMouseEnter={() => {
                if (window.matchMedia('(min-width: 768px)').matches) {
                  if (navItem.name === 'Tools') {
                    toolsRef.classList.remove('hidden')
                    toolRef().replaceWith(toolsRef)
                  }
                }
              }}
              onClick={() => {
                if (navItem.name === 'Tools') {
                  toolsRef.classList.toggle('hidden')
                  toolRef().insertAdjacentElement('afterend', toolsRef)
                } else {
                  toggleMobileMenu()
                }
              }}
              class={`navLink ${currentPath() === navItem.url && 'active'} ${
                currentPath() === '/player' &&
                navItem.name === 'Account' &&
                'active'
              } ${
                currentPath() === '/create-adventurer' &&
                navItem.name === 'Account' &&
                'active'
              }`}
              href={navItem.url}
            >
              {navItem.name}
            </a>
          )}
        </For>
        <div class='hidden toolLinks' ref={toolsRef}>
          <a
            onClick={() => toggleMobileMenu()}
            class={`${currentPath() === '/tools/crafting' && 'active'}`}
            href='/tools/crafting'
          >
            Crafting
          </a>
          <a
            onClick={() => toggleMobileMenu()}
            class={`${currentPath() === '/tools/adventurers' && 'active'}`}
            href='/tools/adventurers'
          >
            Adventurers
          </a>
        </div>
      </nav>
    </div>
  )
}
