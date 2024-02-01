import { createSignal } from 'solid-js'
import { rules } from '../../utils/rules'
import { Select } from '@thisbeyond/solid-select'
import '@thisbeyond/solid-select/style.css'
import '../styles/pages/rules.css'

export function Rules() {
  const [selectedRules, setSelectedRules] = createSignal(rules.general)

  const options = [
    { value: JSON.stringify(rules.general), label: 'General' },
    { value: JSON.stringify(rules.ashitaApproved), label: 'Approved Ashita' },
    { value: JSON.stringify(rules.ashitaBanned), label: 'Banned Ashita' },
    {
      value: JSON.stringify(rules.windowerApproved),
      label: 'Approved Windower',
    },
    { value: JSON.stringify(rules.windowerBanned), label: 'Banned Windower' },
  ]

  const handleChange = (e) => {
    const selectedValue = e.value
    const selectedArray = JSON.parse(selectedValue)
    setSelectedRules(selectedArray)
  }

  return (
    <div class='rulesContainer'>
      <label for='ruleSelect' class='ruleLabel'>
        Select a Rule Set:
      </label>
      <Select
        onChange={(e) => handleChange(e)}
        class='custom'
        options={options}
        format={(item) => item.label}
        placeholder='General'
        id='ruleSelect'
      />
      <ol class='listContainer'>
        <For each={selectedRules()}>
          {(item) => <li class='rulesItem'>{item}</li>}
        </For>
      </ol>
    </div>
  )
}
