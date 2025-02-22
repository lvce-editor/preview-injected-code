import * as QuerySelector from '../QuerySelector/QuerySelector.ts'
import * as QuerySelectorWithOptions from '../QuerySelectorWithOptions/QuerySelectorWithOptions.ts'

// TODO move all of these to test worker

export const toBeVisible = (locator: any): string => {
  return `expected selector to be visible ${locator._selector}`
}

export const toHaveValue = (locator: any, { value }: any): string => {
  return `expected selector ${locator._selector} to have value ${value}`
}

const printLocator = (locator: any): string => {
  if (locator._nth !== -1) {
    return `${locator._selector}:nth(${locator._nth})`
  }
  if (locator._hasText) {
    return `${locator._selector} "${locator._hasText}"`
  }
  return `${locator._selector}`
}

export const toHaveText = (locator: any, { text }: any): string => {
  const element = QuerySelectorWithOptions.querySelectorWithOptions(
    locator._selector,
    {
      nth: locator._nth,
      hasText: locator._hasText,
    },
  )
  const locatorString = printLocator(locator)
  if (!element) {
    return `expected selector ${locatorString} to have text "${text}" element was not found`
  }
  return `expected selector ${locatorString} to have text "${text}" but was "${element.textContent}"`
}

export const toHaveAttribute = (locator: any, { key, value }: any): string => {
  const element = QuerySelectorWithOptions.querySelectorWithOptions(
    locator._selector,
    {
      nth: locator._nth,
      hasText: locator._hasText,
    },
  )
  const locatorString = printLocator(locator)
  if (!element) {
    return `expected ${locatorString} to have attribute ${key} ${value} but element was not found`
  }
  const actual = element.getAttribute(key)
  return `expected ${locatorString} to have attribute ${key} ${value} but was ${actual}`
}

export const toHaveCount = (locator: any, { count }: any): string => {
  const locatorString = printLocator(locator)
  const elements = QuerySelector.querySelector(locator._selector)
  const actualCount = elements.length
  return `expected ${locatorString} to have count ${count} but was ${actualCount}`
}

const stringifyElement = (element: any): string => {
  if (element.id) {
    return `#${element.id}`
  }
  if (element.className) {
    return `.${element.className}`
  }
  if (element === document.body) {
    return 'document.body'
  }
  return element.tagName
}

export const toBeFocused = (locator: any): string => {
  const locatorString = printLocator(locator)
  const {activeElement} = document
  const stringifiedActiveElement = stringifyElement(activeElement)
  return `expected ${locatorString} to be focused but active element is ${stringifiedActiveElement}`
}

export const toHaveClass = (locator: any, { className }: any): string => {
  const [element] = QuerySelector.querySelector(locator._selector)
  const locatorString = printLocator(locator)
  if (!element) {
    return `expected ${locatorString} to have class ${className} but element was not found`
  }
  return `expected ${locatorString} to have class ${className}`
}

export const toHaveId = (locator: any, { id }: any): string => {
  const [element] = QuerySelector.querySelector(locator._selector)
  const locatorString = printLocator(locator)
  if (!element) {
    return `expected ${locatorString} to have id ${id} but element was not found`
  }
  return `expected ${locatorString} to have id ${id} but was ${element.id}`
}

export const toBeHidden = (locator: any): string => {
  const locatorString = printLocator(locator)
  return `expected ${locatorString} to be hidden`
}

export const toHaveCss = (locator: any, { key, value }: any): string => {
  const [element] = QuerySelector.querySelector(locator._selector)
  const locatorString = printLocator(locator)
  if (!element) {
    return `expected ${locatorString} to have css ${key} ${value} but element was not found`
  }
  const style = getComputedStyle(element)
  const actual = style[key]
  return `expected ${locatorString} to have css ${key} ${value} but was ${actual}`
}
