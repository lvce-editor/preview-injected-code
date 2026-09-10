/** @jest-environment jsdom */
import { expect, test } from '@jest/globals'
import * as CheckConditionError from '../src/parts/CheckConditionError/CheckConditionError.ts'
import * as CheckSingleElementCondition from '../src/parts/CheckSingleElementCondition/CheckSingleElementCondition.ts'

test.each([11, 'toHaveText'])('accepts condition %s in webviews', async (condition) => {
  document.body.innerHTML = '<button class="target">Save</button>'
  const locator = { _selector: '.target' }
  await expect(CheckSingleElementCondition.checkSingleElementCondition(locator, condition, { text: 'Save' })).resolves.toEqual({ error: false })
  expect(await CheckConditionError.checkConditionError(condition, locator)).toEqual({ actual: 'Save', wasFound: true })
  document.body.replaceChildren()
  expect(await CheckConditionError.checkConditionError(condition, locator)).toEqual({ actual: '', wasFound: false })
})
