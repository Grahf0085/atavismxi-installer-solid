import { For, Show, createResource, createSignal } from 'solid-js'
import { Select } from '@thisbeyond/solid-select'
import { createForm } from '@felte/solid'
import { fetchRecipes } from '../../../utils/search'
import { Recipe } from '../../components/Recipe'
import '@thisbeyond/solid-select/style.css'
import '../../styles/pages/tools/recipes.css'

export function Recipes() {
  const options = [
    { value: 'wood', label: 'Woodworking' },
    { value: 'smith', label: 'Smithing' },
    { value: 'gold', label: 'Goldsmithing' },
    { value: 'cloth', label: 'Clothcraft' },
    { value: 'leather', label: 'Leathercraft' },
    { value: 'bone', label: 'Bonecraft' },
    { value: 'alchemy', label: 'Alchemy' },
    { value: 'cook', label: 'Cooking' },
  ]

  const [craft, setCraft] = createSignal('wood')
  const [minLevel, setMinLevel] = createSignal(1)
  const [maxLevel, setMaxLevel] = createSignal(103)
  const [searchResult, setSearchResult] = createSignal('')
  const [searchIngredient, setSearchIngredient] = createSignal('')
  const [filteredRecipes, setFilteredRecipes] = createSignal([])

  const [fetchedRecipes] = createResource(craft, fetchRecipes)

  const onlyNums = (e) => {
    const charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
    const charStr = String.fromCharCode(charCode)
    if (!charStr.match(/^[0-9]+$/) && charCode !== 13 && charCode !== 'enter')
      e.preventDefault()
  }

  const searchResults = (recipe) => {
    for (const searchTerm of searchResult().split(' ')) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      if (
        recipe.result.toLowerCase().indexOf(lowerCaseSearchTerm) > -1 ||
        recipe.resultHqOne.toLowerCase().indexOf(lowerCaseSearchTerm) > -1 ||
        recipe.resultHqTwo.toLowerCase().indexOf(lowerCaseSearchTerm) > -1 ||
        recipe.resultHqThree.toLowerCase().indexOf(lowerCaseSearchTerm) > -1
      )
        return true
    }
  }

  const searchIngredients = (recipe) => {
    const ingredientList = [
      recipe.ingredientOne,
      recipe.ingredientTwo,
      recipe.ingredientThree,
      recipe.ingredientFour,
      recipe.ingredientFive,
      recipe.ingredientSix,
      recipe.ingredientSeven,
      recipe.ingredientEight,
    ]

    const ingredientListNoDuplicates = [...new Set(ingredientList)].filter(
      (ingredient) => ingredient !== null,
    )

    for (const searchTerm of searchIngredient().split(' ')) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      for (const ingredient of ingredientListNoDuplicates) {
        if (ingredient.toLowerCase().indexOf(lowerCaseSearchTerm) > -1)
          return true
      }
    }
  }

  const { form, errors } = createForm({
    onSubmit: (values) => {
      setMinLevel(values.minLevel)
      setMaxLevel(values.maxLevel)
      setSearchResult(values.searchResult)
      setSearchIngredient(values.searchIngredient)
    },

    validate: (values) => {
      const errors = {}
      if (
        values.minLevel < 1 ||
        values.minLevel > 103 ||
        typeof values.minLevel !== 'number'
      )
        errors.minLevel = 'Please enter a number between 1 and 103.'

      if (
        values.maxLevel < 1 ||
        values.maxLevel > 103 ||
        typeof values.maxLevel !== 'number'
      )
        errors.maxLevel = 'Please enter a number between 1 and 103.'

      if (values.minLevel > values.maxLevel) {
        errors.minLevel = "Min level can't be higher than max level"
        errors.maxLevel = "Max level can't be lower than min level"
      }

      return errors
    },

    onError(err) {
      const errors = {}
      errors.serverError = err
      return errors
    },

    onSuccess(response) {
      const recipesAskedFor = fetchedRecipes().filter(
        (recipe) =>
          recipe[craft()] >= minLevel() &&
          recipe[craft()] <= maxLevel() &&
          searchResults(recipe) &&
          searchIngredients(recipe),
      )

      setFilteredRecipes(recipesAskedFor)
    },
  })

  return (
    <div class='craftContainer'>
      <form class='recipesForm' use:form>
        <div class='firstRow'>
          <div class='selectContainer'>
            <label class='recipesLabel' for='craftSelect'>
              Craft
            </label>
            <Select
              onChange={(e) => {
                setCraft(e.value)
                setMinLevel(1)
                setMaxLevel(103)
                setSearchResult('')
                setSearchIngredient('')
                setFilteredRecipes([])
              }}
              class='custom'
              options={options}
              format={(item) => item.label}
              placeholder='Woodworking'
              id='craftSelect'
            />
          </div>
          <label class='recipesLabel' for='minLevel'>
            Min Level
            <input
              class='recipesInput'
              type='number'
              name='minLevel'
              value={minLevel()}
              min={1}
              max={103}
              onKeyPress={(e) => onlyNums(e)}
              id='minLevel'
            />
            <Show when={errors().minLevel}>
              <p>{errors().minLevel}</p>
            </Show>
          </label>
          <label class='recipesLabel' for='maxLevel'>
            Max Level
            <input
              class='recipesInput'
              type='number'
              name='maxLevel'
              value={maxLevel()}
              min={1}
              max={103}
              onKeyPress={(e) => onlyNums(e)}
              id='maxLevel'
            />
            <Show when={errors().maxLevel}>
              <p>{errors().maxLevel}</p>
            </Show>
          </label>
        </div>
        <label class='recipesLabel'>
          Result
          <input
            class='recipesInput'
            type='text'
            name='searchResult'
            placeholder='search for a result'
            value={searchResult()}
          />
        </label>
        <Show when={errors().minLevel}>
          <p>{errors().resultSearch}</p>
        </Show>
        <label class='recipesLabel'>
          Ingredient
          <input
            class='recipesInput'
            type='text'
            name='searchIngredient'
            placeholder='search for an ingredient'
            value={searchIngredient()}
          />
        </label>
        <Show when={errors().minLevel}>
          <p>{errors().ingredientSearch}</p>
        </Show>
        <div class='recipesButtonContainer'>
          <button
            type='reset'
            onClick={() => {
              setMinLevel(1)
              setMaxLevel(103)
              setSearchResult('')
              setSearchIngredient('')
              setFilteredRecipes([])
            }}
          >
            Reset
          </button>
          <button type='submit'>Search</button>
          <Show when={errors().serverError}>
            <p>{errors().serverError}</p>
          </Show>
        </div>
      </form>
      <div class='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Result</th>
              <th>High Quality</th>
              <th>High Quality+</th>
              <th>High Quality++</th>
              <th>Ingredients</th>
              <th>Skilz</th>
            </tr>
          </thead>
          <tbody>
            <Show
              when={filteredRecipes().length > 0}
              fallback={
                <For each={fetchedRecipes()}>
                  {(recipe) => <Recipe {...recipe} />}
                </For>
              }
            >
              <For each={filteredRecipes()}>
                {(recipe) => <Recipe {...recipe} />}
              </For>
            </Show>
          </tbody>
        </table>
      </div>
    </div>
  )
}
