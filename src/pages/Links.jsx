import { For } from 'solid-js'
import '../styles/pages/links.css'

export function Links() {
  const links = [
    {
      title: 'Discord',
      url: 'https://discord.gg/Hpe657nmGu',
      text: "Join us on discord if you'd like to chat, bring anything to the communities attention, or hang out.",
    },
    {
      title: 'Cloud',
      url: 'https://cloud.atavismxi.com',
      text: 'Personal cloud service for Atavism XI. Add files and share them.',
    },
    {
      title: 'Game Bugs',
      url: 'https://gitlab.com/Grahf0085/AtavismXI/-/issues',
      text: 'Maybe check the ASB or Horizon bug report list before submitting a bug report here.',
    },
    {
      title: 'Website Bugs',
      url: 'https://gitlab.com/Grahf0085/atavismxiwebsite/-/issues',
      text: 'These will be bugs that I actually made.',
    },
    {
      title: 'Campsitarus',
      url: 'https://campsitarus.blogspot.com/',
      text: 'Find a camp. Tent not included',
    },
    {
      title: 'FFXI Atlas',
      url: 'https://ffxi-atlas.com/',
      text: 'All the FFXI maps. Hand drawn by 1000s of adventurers over decades.',
    },
    {
      title: 'Pyogenes Time',
      url: 'http://www.pyogenes.com/ffxi/timer/v2.html',
      text: 'A fancy clock.',
    },
    {
      title: 'Skill Chain Calculator',
      url: 'https://flippantry.com/skillchain/',
      text: 'Calculus made easy.',
    },
    {
      title: 'Stats Calculator',
      url: 'https://ffxi-stat-calc.sourceforge.net/cgi-bin/ffxistats.cgi',
      text: 'Only does Algebra.',
    },
    {
      title: 'FFXIDB',
      url: 'http://www.ffxidb.com/',
      text: 'Not the database we use.',
    },
  ]
  return (
    <div class='linksContainer'>
      <For each={links}>
        {(link) => (
          <article class='linksItem'>
            <a class='linksLink' href={link.url}>
              <h2 class='linkTitle'>{link.title}</h2>
              <p>{link.text}</p>
            </a>
          </article>
        )}
      </For>
    </div>
  )
}
