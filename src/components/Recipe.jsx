import { For } from 'solid-js'
import '../styles/pages/recipe.css'

export function Recipe(props) {
  const replaceUnderscores = (value) => value.replaceAll('_', ' ')

  const ingredientList = [
    props.ingredientOne,
    props.ingredientTwo,
    props.ingredientThree,
    props.ingredientFour,
    props.ingredientFive,
    props.ingredientSix,
    props.ingredientSeven,
    props.ingredientEight,
  ]

  const ingredientListNoDuplicates = [...new Set(ingredientList)].filter(
    (ingredient) => ingredient !== null,
  )

  const ingredientQuantity = {}

  ingredientList.forEach((ingredient) => {
    ingredientQuantity[ingredient] = (ingredientQuantity[ingredient] || 0) + 1
  })

  return (
    <tr>
      <td data-th='Result'>
        {replaceUnderscores(props.result)} ({props.resultQty})
      </td>
      <td data-th='High Quality'>
        {replaceUnderscores(props.resultHqOne)} ({props.resultHqOneQty})
      </td>
      <td data-th='High Quality+'>
        {replaceUnderscores(props.resultHqTwo)} ({props.resultHqTwoQty})
      </td>
      <td data-th='High Quality++'>
        {replaceUnderscores(props.resultHqThree)} ({props.resultHqThreeQty})
      </td>
      <td data-th='Ingredients'>
        <ul class='ingredientContainer'>
          <For each={ingredientListNoDuplicates}>
            {(ingredient) => (
              <li class='ingredientItem'>
                {ingredient && replaceUnderscores(ingredient)} (
                {ingredientQuantity[ingredient]})
              </li>
            )}
          </For>
        </ul>
      </td>
      <td data-th='Skilz'>
        <ul class='skilzContainer'>
          <li class='skillItem'>{props.wood !== 0 && 'Wood: ' + props.wood}</li>
          <li class='skillItem'>
            {props.smith !== 0 && 'Smith: ' + props.smith}
          </li>
          <li class='skillItem'>{props.gold !== 0 && 'Gold: ' + props.gold}</li>
          <li class='skillItem'>
            {props.cloth !== 0 && 'Cloth: ' + props.cloth}
          </li>
          <li class='skillItem'>
            {props.leather !== 0 && 'Leather: ' + props.leather}
          </li>
          <li class='skillItem'>{props.bone !== 0 && 'Bone: ' + props.bone}</li>
          <li class='skillItem'>
            {props.alchemy !== 0 && 'Alchemy: ' + props.alchemy}
          </li>
          <li class='skillItem'>{props.cook !== 0 && 'Cook: ' + props.cook}</li>
        </ul>
      </td>
    </tr>
  )
}
