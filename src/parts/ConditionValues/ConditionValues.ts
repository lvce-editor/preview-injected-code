import * as QuerySelectorWithOptions from '../QuerySelectorWithOptions/QuerySelectorWithOptions.ts'

export const toHaveText = (locator): any => {
  const element = QuerySelectorWithOptions.querySelectorWithOptions(locator._selector, {
    nth: locator._nth,
    hasText: locator._hasText,
  })
  if (!element) {
    return {
      wasFound: false,
      actual: '',
    }
  }
  return {
    wasFound: true,
    actual: element.textContent,
  }
}

export const toHaveAttribute = (locator, { key, value }): any => {
  const element = QuerySelectorWithOptions.querySelectorWithOptions(locator._selector, {
    nth: locator._nth,
    hasText: locator._hasText,
  })
  if (!element) {
    return {
      wasFound: false,
      actual: '',
    }
  }
  const actual = element.getAttribute(key)
  return {
    wasFound: false,
    actual,
  }
}

export const toHaveCount = (locator, { count }): any => {
  const elements = QuerySelectorWithOptions.querySelector(locator._selector)
  const actualCount = elements.length
  return {
    actual: actualCount,
  }
}

const stringifyElement = (element): any => {
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

export const toBeFocused = (locator): any => {
  const { activeElement } = document
  const stringifiedActiveElement = stringifyElement(activeElement)
  return {
    actual: stringifiedActiveElement,
  }
}

export const toHaveClass = (locator, { className }): any => {
  const [element] = QuerySelectorWithOptions.querySelector(locator._selector)
  if (!element) {
    return {
      wasFound: false,
      actual: '',
    }
  }
  return {
    wasFound: true,
    actual: className,
  }
}

export const toHaveId = (locator): any => {
  const [element] = QuerySelectorWithOptions.querySelector(locator._selector)
  if (!element) {
    return {
      wasFound: false,
      actual: '',
    }
  }
  return {
    wasFound: true,
    actual: element.id,
  }
}

export const toHaveCss = (locator, { key }): any => {
  const [element] = QuerySelectorWithOptions.querySelector(locator._selector)
  if (!element) {
    return {
      wasFound: false,
      actual: '',
    }
  }
  const style = getComputedStyle(element)
  const actual = style[key]
  return {
    wasFound: true,
    actual,
  }
}
