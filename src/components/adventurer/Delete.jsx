import { Show, createSignal, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { createForm } from '@felte/solid'
import HeartCrack from '../../../node_modules/lucide-solid/dist/source/icons/heart-crack.jsx'
import { getPlayer } from '../../../utils/auth.js'
import '../../styles/components/adventurer/delete.css'

export function Delete(props) {
  const [killClicked, setKillClicked] = createSignal(false)
  const [nameConfirmation, setNameConfirmation] = createSignal('')
  const [playerId, setPlayerId] = createSignal()

  const namesMatch = () => nameConfirmation() === props.charName

  const navigate = useNavigate()

  onMount(async () => {
    const player = await getPlayer()
    setPlayerId(player?.id)
  })

  const { form, errors } = createForm({
    onSubmit: async (values, { form }) => {
      const formData = new FormData(form)

      const response = await fetch(
        `https://www.atavismxi.com/api/adventurer/delete`,
        {
          /* can't get patch to work */
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

    onError(err) {
      const errors = {}
      errors.serverErrors = err
      return errors
    },

    onSuccess() {
      navigate(`/player/`, { replace: true })
    },
  })
  return (
    <Show when={playerId() === props.charAccountId}>
      <div class='deleteContainer'>
        <button
          onClick={() => setKillClicked(!killClicked())}
          class='deleteButton'
          type='button'
        >
          <HeartCrack />
          Kill {props.charName}?
          <HeartCrack />
        </button>
        <Show when={killClicked()}>
          <label class='deleteNameLabel'>
            <span class='hidden'>
              Type the name of {props.charName} to Confirm You Want to Kill{' '}
              {props.charName}:
            </span>
            <input
              type='text'
              value={nameConfirmation()}
              onInput={(e) => setNameConfirmation(e.target.value)}
              placeholder={
                'Type adventurers name to confirm you want to delete him/her'
              }
            />
          </label>
        </Show>
        <Show when={namesMatch() && killClicked()}>
          <form use:form class='deleteForm'>
            <input type='hidden' name='accountId' value={props.charAccountId} />
            <input type='hidden' name='charId' value={props.charId} />
            <button
              class='deleteButton'
              type='submit'
              disabled={nameConfirmation() !== props.charName}
            >
              <HeartCrack />
              Kill {props.charName}!
              <HeartCrack />
            </button>
            <Show when={errors().serverErrors?.errors?.charId}>
              <p>{errors().serverErrors?.errors?.charId}</p>
            </Show>
            <Show when={errors().serverErrors?.errors?.accountId}>
              <p>{errors().serverErrors?.errors?.accountId}</p>
            </Show>
            <Show when={errors().serverErrors?.errors}>
              <p>{errors().serverErrors?.errors}</p>
            </Show>
          </form>
        </Show>
      </div>
    </Show>
  )
}
