import { querySelector } from '../QuerySelector/QuerySelector.ts'

export const querySelectorWithOptions = (
  selector: any,
   
  { nth = -1, hasText = '' } = {},
): any => {
  let elements = querySelector(selector)
  if (hasText) {
    elements = elements.filter((element) => element.textContent === hasText)
  }
  if (elements.length === 0) {
    return undefined
  }
  if (elements.length === 1) {
    const element = elements[0]
    return element
  }
  if (nth === -1) {
    throw new Error(
      `too many matching elements for ${selector}, matching ${elements.length}`,
    )
  }
  const element = elements[nth]
  if (!element) {
    throw new Error(`selector not found: ${selector}`)
  }
  return element
}
