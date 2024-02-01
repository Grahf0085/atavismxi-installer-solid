import { Show } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { createForm } from '@felte/solid'
import { formatFaceRaceForDb, jobs } from '../../../utils/createAdventurer'
import { adventurerImage } from '../../../utils/adventurerConversion'
import { nationEmblems } from '../../../utils/adventurerDetails'
import '../../styles/components/createAdventurer/creationForm.css'

export function CreationForm(props) {
  const formattedRaceFace = formatFaceRaceForDb(props.selectedFace)
  const faceUrl = adventurerImage(props.selectedFace)

  const navigate = useNavigate()

  const onlyLetters = (e) => {
    const charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
    const charStr = String.fromCharCode(charCode)
    if (
      !charStr.match(/[a-z]+/) &&
      !charStr.match(/[A-Z]/) &&
      charCode !== 13 &&
      charCode !== 'enter'
    )
      e.preventDefault()
  }

  const { form, errors, createSubmitHandler } = createForm({
    onSubmit: async (values, { form }) => {
      const formData = new FormData(form)

      const response = await fetch(
        `https://www.atavismxi.com/api/adventurer/create`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      )

      if (!response.ok) {
        throw await response.json()
      }

      return response
    },

    validate: async (values) => {
      const errors = {}

      if (!values.adventurerName)
        errors.adventurerName = [
          'Please enter an adventurer name over three characters.',
        ]

      if (
        (values.adventurerName && values.adventurerName.length < 3) ||
        (values.adventurerName && values.adventurerName.length > 15)
      )
        errors.adventurerName = [
          'Adventurer name must be between 3 and fifteen characters.',
        ]

      if (
        values.adventurerName &&
        values.adventurerName.charAt(0) !==
          values.adventurerName.charAt(0).toUpperCase()
      ) {
        errors.adventurerName = [
          'First letter of adventurer name must be capitalized.',
        ]
      }

      if (
        values.adventurerName &&
        values.adventurerName.substring(1) !==
          values.adventurerName.substring(1).toLowerCase()
      ) {
        errors.adventurerName = [
          'All letters besides the first letter need to be lowercase.',
        ]
      }

      if (!/^[a-zA-Z]+$/.test(values.adventurerName)) {
        errors.adventurerName = ['Adventurer names can only contain letters.']
      }

      return errors
    },

    onError(err) {
      const errors = {}
      errors.serverErrors = err
      return errors
    },

    onSuccess() {
      navigate(`/player`, { replace: true })
    },
  })

  const altOnSubmit = createSubmitHandler({})

  return (
    <section class='creationContainer'>
      <h2 class='creationTitle'>Name Your Adventurer</h2>
      <form class='creationForm' use:form>
        <label>
          Adventurer's Name
          <input
            type='text'
            name='adventurerName'
            minlength={3}
            maxlength={15}
            required
            onKeyPress={(e) => onlyLetters(e)}
          />
        </label>
        <input type='hidden' name='accountId' value={props.accountId} />
        <input type='hidden' name='face' value={formattedRaceFace.face} />
        <input type='hidden' name='race' value={formattedRaceFace.race} />
        <input type='hidden' name='size' value={props.selectedSize} />
        <input type='hidden' name='job' value={props.selectedJob} />
        <input type='hidden' name='nation' value={props.selectedNation} />
        <Show when={errors()?.adventurerName}>
          <p>{errors().adventurerName}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.adventurerName}>
          <p>{errors().serverErrors?.errors?.adventurerName}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.accountId}>
          <p>{errors().serverErrors?.errors?.accountId}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.face}>
          <p>{errors().serverErrors?.errors?.face}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.race}>
          <p>{errors().serverErrors?.errors?.race}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.size}>
          <p>{errors().serverErrors?.errors?.size}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.job}>
          <p>{errors().serverErrors?.errors?.job}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.nation}>
          <p>{errors().serverErrors?.errors?.nation}</p>
        </Show>
        <Show when={errors().serverErrors?.message}>
          <p>{errors().serverErrors.errors}</p>
        </Show>
      </form>
      <div class='creationProfile'>
        <figure class='creationFigure'>
          <figcaption>
            You are about to create a{' '}
            <b>{['Small', 'Medium', 'Large'][props.selectedSize]}</b> sized{' '}
            <b>
              {props.selectedRace.charAt(0).toUpperCase() +
                props.selectedRace.substring(1)}
            </b>{' '}
            <b>{jobs[props.selectedJob - 1].name}</b> that looks like this:
          </figcaption>
          <img
            src={faceUrl}
            alt={'Picture of Adventurer About to be Created'}
          />
        </figure>
        <figure class='allegianceFigure'>
          <figcaption>
            You swear allegiance to:{' '}
            {["San d'Oria", 'Bastok', 'Windurst'][props.selectedNation]}
          </figcaption>
          <img
            src={nationEmblems[props.selectedNation].pic}
            alt={nationEmblems[props.selectedNation].alt}
          />
        </figure>
      </div>
      <div class='creationButtonContainer'>
        <button
          class='creationButton twoCreationButtons'
          onClick={() => props.setStep(4)}
        >
          Prev
        </button>
        <button
          class='creationButton twoCreationButtons'
          type='submit'
          onClick={altOnSubmit}
        >
          Create
        </button>
      </div>
    </section>
  )
}
