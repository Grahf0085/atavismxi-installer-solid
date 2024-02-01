import { createSignal, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { FaceSelection } from '../components/createAdventurer/FaceSelection'
import { RaceSelection } from '../components/createAdventurer/RaceSelection'
import { SizeSelection } from '../components/createAdventurer/SizeSelection'
import { JobSelection } from '../components/createAdventurer/JobSelection'
import { NationSelection } from '../components/createAdventurer/NationSelection'
import { CreationForm } from '../components/createAdventurer/CreationForm'
import { Animate } from '../components/createAdventurer/Animate'
import { getPlayer } from '../../utils/auth'
import { faces } from '../../utils/faces'
import '../styles/pages/createAdventurer.css'

export function CreateAdventurer() {
  const [step, setStep] = createSignal(0)
  const [selectedRace, setSelectedRace] = createSignal('hume')
  const [playerId, setPlayerId] = createSignal()

  const facesToShow = () => faces[selectedRace()]

  const [selectedFace, setSelectedFace] = createSignal(facesToShow()[0])
  const [selectedSize, setSelectedSize] = createSignal(0)
  const [selectedJob, setSelectedJob] = createSignal(1)
  const [selectedNation, setSelectedNation] = createSignal(0)

  const navigate = useNavigate()

  onMount(async () => {
    const player = await getPlayer()

    if (!player) {
      navigate('/', { replace: true })
    }

    setPlayerId(player.id)
  })

  return (
    <>
      <Animate
        showWhen={step() === 0}
        component={
          <RaceSelection
            selectedRace={selectedRace()}
            setSelectedRace={setSelectedRace}
            setStep={setStep}
          />
        }
      />

      <Animate
        showWhen={step() === 1}
        component={
          <FaceSelection
            selectedRace={selectedRace()}
            selectedFace={selectedFace()}
            setSelectedFace={setSelectedFace}
            facesToShow={facesToShow()}
            setStep={setStep}
          />
        }
      />

      <Animate
        showWhen={step() === 2}
        component={
          <SizeSelection
            selectedRace={selectedRace()}
            selectedFace={selectedFace().substring(0, 2)}
            selectedSize={selectedSize()}
            setSelectedSize={setSelectedSize}
            setStep={setStep}
          />
        }
      />

      <Animate
        showWhen={step() === 3}
        component={
          <JobSelection
            selectedJob={selectedJob()}
            setSelectedJob={setSelectedJob}
            setStep={setStep}
          />
        }
      />

      <Animate
        showWhen={step() === 4}
        component={
          <NationSelection
            selectedNation={selectedNation()}
            setSelectedNation={setSelectedNation}
            setStep={setStep}
          />
        }
      />

      <Animate
        showWhen={step() === 5}
        component={
          <CreationForm
            accountId={playerId()}
            selectedRace={selectedRace()}
            selectedFace={selectedFace()}
            selectedSize={selectedSize()}
            selectedJob={selectedJob()}
            selectedNation={selectedNation()}
            setStep={setStep}
          />
        }
      />
    </>
  )
}
