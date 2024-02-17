import { For } from 'solid-js'
import { AboutItem } from '../components/AboutItem'
import '../styles/pages/about.css'

export function About() {
  const aboutItems = [
    {
      title: 'The Only COP Era Server',
      text: `Despite all of the private servers that have came and gone very few have been COP era servers.  
    Nasomi stopped at COP for a while. Kupo was a COP server while it lasted. COP stood out because of its challenging content 
    at lower levels, dark environments, and centrality to the world building of the game, adding layers to its lore. Players
    had to revert to and limit themselves to earlier levels, sneak through some of the darkest zones as a team, and finally get to 
    their goal where they either lost a big fight or got an amazing cutscene. Since COP, FFXI took another direction. For 
    example, instanced zones (salvage), melee burn, blm burn, smn burn, and mnk burn experience point parties, players of all
    levels and all jobs to participating in events together(beseiged), and adding jobs that fill multiple roles (to varying
    degrees) in a party have all made the game a little flatter.
`,
    },
    {
      title: 'Based on Air Sky Boat',
      text: 'Expect things to be similar to Air Sky Boat.',
    },
    {
      title: 'MNK More Viable Subjob',
      text: `Something I did like about TOAU was that MNK became a more viable subjob. I try to do the same thing here by increaing several jobs H2H skill.`,
    },
    {
      title: 'PLD and DRK MP Pool equals RDMs',
      text: `This is how PLD and DRK were before the US release.`,
    },
    {
      title: 'TOAU Merits',
      text: `Gives you something to do 75+.`,
    },
    {
      title: 'WOTG NMs',
      text: `Several low level NMs from WOTG have been placed in the starter zones.`,
    },
    {
      title: 'Accurate and Era Relevant Recipes',
      text: `Each recipe was merticulously researched. Please reach out if you disagree with a recipe and see the crafting section of this site. Skillup rate 1.5x regaular skill up rate.`,
    },
    {
      title: 'The larger your party - the more experience points you get',
      text: `To encourage group play (the thing that made the game what it was) and due to low population the more people you have in your party the more exp you will get. Six Members: 150%, Five Members: 140%, Four Member: 130%, Three Members: 120%.`,
    },
    {
      title: 'Unlimited AH Listings. Nothing Expires at the AH',
      text: `Items don't sell very fast with lower population.`,
    },
    {
      title: 'Dia/Bio Overwrite Works Both Ways',
      text: `We are not biased.`,
    },
    {
      title: 'Level Sync Enabled',
      text: `Not ideal but low population so... Similar to <a href="https://horizonffxi.wiki/Level_Sync">Horizons Level Sync.</a>`,
    },
    {
      title: 'No Global Yell',
      text: `Some servers have it. Just mentioning that we don't use it.`,
    },
    {
      title: 'Dual Boxing Allowed',
      text: `Not ideal but low population so...`,
    },
    {
      title: 'Three adventurers per account',
      text: 'No more.',
    },
    {
      title: 'Crafting Skillup',
      text: 'Chance to skill up at 1.5x normal rate. Also applies to fishing.',
    },
    {
      title: 'Server Tech Info',
      text: 'Operating System: Debian 12. Hardware: core i5 1140G7, 16GB LPDDR4X 4266MHz RAM, and a 512GB PCIe SSD Connection: 350mbps. SSH connection is available for me to acccess server remotely. Timeshift and BackNnTime are used to backup the server. Test server setup on same machine.',
    },
  ]

  return (
    <div class='aboutContainer'>
      <For each={aboutItems}>
        {(aboutItem) => (
          <AboutItem title={aboutItem.title} text={aboutItem.text} />
        )}
      </For>
    </div>
  )
}
