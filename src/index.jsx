/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import { BaseLayout } from './layouts/BaseLayout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Support } from './pages/Support'
import { Rules } from './pages/Rules'
import { Links } from './pages/Links'
import { Recipes } from './pages/tools/Recipes'
import { Adventurers } from './pages/tools/Adventuers'
import { AdventurerDetails } from './components/adventurer/AdventurerDetails'
import { Auth } from './pages/Auth'
import { Player } from './pages/Player'
import { Account } from './pages/Account'
import { CreateAdventurer } from './pages/CreateAdventurer'
import { NotFound } from './pages/NotFound'
import './styles/global.css'

render(
  () => (
    <Router>
      <Route path='/' component={BaseLayout}>
        <Route path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/support' component={Support} />
        <Route path='/rules' component={Rules} />
        <Route path='/links' component={Links} />
        <Route path='/account' component={Account} />
        <Route path='/auth' component={Auth} />
        <Route path='/tools/crafting' component={Recipes} />
        <Route path='/tools/adventurers' component={Adventurers} />
        <Route path='/adventurer-details' component={AdventurerDetails} />
        <Route path='/player' component={Player} />
        <Route path='/create-adventurer' component={CreateAdventurer} />
        <Route path='*404' component={NotFound} />
      </Route>
    </Router>
  ),
  document.getElementById('root'),
)
