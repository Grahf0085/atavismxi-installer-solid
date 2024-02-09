import '@fontsource-variable/kreon'
import '@fontsource-variable/el-messiri'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { GameVersionProvider } from '../providers/VersionProvider'
import '../styles/layouts/baselayout.css'
import { createSignal } from 'solid-js'

export function BaseLayout(props) {
  const [menuRef, setMenuRef] = createSignal()
  const [openMenuButtonRef, setOpenMenuButtonRef] = createSignal()
  const [closeMenuButtonRef, setCloseMenuButtonRef] = createSignal()

  return (
    <GameVersionProvider>
      <div class='layoutContainer'>
        <Header
          menuRef={menuRef()}
          openMenuButtonRef={openMenuButtonRef()}
          closeMenuButtonRef={closeMenuButtonRef()}
          setOpenMenuButtonRef={setOpenMenuButtonRef}
          setCloseMenuButtonRef={setCloseMenuButtonRef}
        />
        <Nav
          menuRef={menuRef()}
          setMenuRef={setMenuRef}
          openMenuButtonRef={openMenuButtonRef()}
          closeMenuButtonRef={closeMenuButtonRef()}
        />
        <div class='main'>{props.children}</div>
        <Footer />
      </div>
    </GameVersionProvider>
  )
}
