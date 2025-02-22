import { isElement } from '../IsElement/IsElement.ts'
import { querySelectorByCss } from '../QuerySelectorByCss/QuerySelectorByCss.ts'
import { querySelectorByText } from '../QuerySelectorByText/QuerySelectorByText.ts'

export const querySelector = (selector: string): readonly any[] => {
  if (typeof selector !== 'string') {
    throw new TypeError('selector must be of type string')
  }
  if (selector.startsWith('text=')) {
    return querySelectorByText(document.body, selector.slice('text='.length))
  }
  if (selector.includes('text=')) {
    const index = selector.indexOf('text=')
    const elements = querySelectorByCss(selector.slice(0, index))
    const text = selector.slice(index + 'text='.length)
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    return elements.flatMap((element) => {
      return querySelectorByText(element, text)
    })
    // for(const element of elements)
  }
  if (selector.startsWith('.')) {
    return querySelectorByCss(selector)
  }
  if (selector.startsWith('#')) {
    return querySelectorByCss(selector)
  }
  if (
    selector.startsWith('[data') ||
    selector.startsWith('[title') ||
    selector.startsWith('[name')
  ) {
    return querySelectorByCss(selector)
  }
  if (isElement(selector)) {
    return querySelectorByCss(selector)
  }
  throw new Error(`unsupported selector: ${selector}`)
}
