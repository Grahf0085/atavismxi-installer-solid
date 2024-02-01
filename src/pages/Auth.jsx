import { createSignal, onMount, Show } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { createForm } from '@felte/solid'
import { invoke } from '@tauri-apps/api/tauri'
import '../styles/pages/auth.css'

export function Auth() {
  const [formType, setFormType] = createSignal('login')

  const navigate = useNavigate()

  const { form, errors } = createForm({
    onSubmit: async (values, { form }) => {
      const formData = new FormData(form)

      if (formType() === 'login') {
        const loginResponse = await fetch(
          `https://www.atavismxi.com/api/auth/login`,
          {
            method: 'POST',
            body: formData,
            credentials: 'include',
          },
        )

        if (!loginResponse.ok) {
          throw await loginResponse.json()
        }

        const loginData = await loginResponse.json()

        return {
          loginData: loginData,
          playerName: values.playerName,
          password: values.password,
        }
      }

      if (formType() === 'register') {
        const registerResponse = await fetch(
          `https://www.atavismxi.com/api/auth/register`,
          {
            method: 'POST',
            body: formData,
            credentials: 'include',
          },
        )

        if (!registerResponse.ok) {
          throw await registerResponse.json()
        }

        const registerData = await registerResponse.json()

        return {
          registerData: registerData,
          playerName: values.playerName,
          password: values.password,
        }
      }
    },

    validate: async (values) => {
      const errors = {}

      if (!values.playerName)
        errors.playerName = [
          'Please enter a player name over three characters.',
        ]

      if (
        (values.playerName && values.playerName.length < 3) ||
        (values.playerName && values.playerName.length > 16)
      )
        errors.playerName = [
          'Player name must be between 3 and sixteen characters.',
        ]

      if (!values.password)
        errors.password = ['Please enter a password over five characters.']

      if (
        (values.password && values.password.length < 5) ||
        (values.password && values.password.length > 64)
      ) {
        errors.password = ['Password must be between five and 64 characters.']
      }

      if (formType() === 'register') {
        if (values.password !== values.confirmPassword)
          errors.passwordsMatch = ["Passwords don't match."]
      }
      return errors
    },

    onSuccess: async (response) => {
      await invoke('set_keyring', {
        player: response.playerName,
        password: response.password,
      })

      navigate(`/player`, { replace: true })
    },

    onError(err) {
      const errors = {}
      errors.serverErrors = err
      return errors
    },
  })

  return (
    <form use:form class='authForm'>
      <fieldset class='formTypeField'>
        <label
          class={`formType ${formType() === 'login' ? 'activeFormType' : ''}`}
        >
          Login
          <input
            type='radio'
            name='loginType'
            value='login'
            checked={formType() === 'login'}
            onChange={() => setFormType('login')}
            class='hidden'
          />
        </label>
        <label
          class={`formType ${
            formType() === 'register' ? 'activeFormType' : ''
          }`}
        >
          Register
          <input
            type='radio'
            name='loginType'
            value='register'
            checked={formType() === 'register'}
            onChange={() => setFormType('register')}
            class='hidden'
          />
        </label>
      </fieldset>
      <fieldset class='formInputsField'>
        <label>
          Player Name
          <input
            type='text'
            name='playerName'
            minlength={3}
            maxlength={16}
            required
          />
        </label>
        <Show when={errors()?.playerName}>
          <p>{errors().playerName}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.playerName}>
          <p>{errors().serverErrors?.errors?.playerName}</p>
        </Show>
        <label>
          Password
          <input
            type='password'
            name='password'
            minlength={5}
            maxlength={64}
            required
          />
        </label>
        <Show when={errors()?.password}>
          <p>{errors().password}</p>
        </Show>
        <Show when={errors().serverErrors?.errors?.password}>
          <p>{errors().serverErrors?.errors?.password}</p>
        </Show>
        <Show when={formType() === 'register'}>
          <label>
            Confirm Password
            <input
              type='password'
              name='confirmPassword'
              minlength={5}
              maxlength={64}
              required
            />
          </label>
        </Show>
        <Show when={errors()?.passwordsMatch}>
          <p>{errors().passwordsMatch}</p>
        </Show>
        <button class='formSubmit'>Submit</button>
        <Show when={errors().serverErrors?.message}>
          <p>{errors().serverErrors.message}</p>
        </Show>
        <Show when={errors().serverErrors?.errors}>
          <p>{errors().serverErrors?.errors}</p>
        </Show>
        <Show when={errors().serverErrors}>
          <p>{errors().serverErrors}</p>
        </Show>
      </fieldset>
    </form>
  )
}
