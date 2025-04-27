import * as QuerySelectorWithOptions from '../QuerySelectorWithOptions/QuerySelectorWithOptions.ts'

export const toHaveText = (locator) => {
  const element = QuerySelectorWithOptions.querySelectorWithOptions(
    locator._selector,
    {
      nth: locator._nth,
      hasText: locator._hasText,
    },
  )
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

export const toHaveAttribute = (locator, { key, value }) => {
  const element = QuerySelectorWithOptions.querySelectorWithOptions(
    locator._selector,
    {
      nth: locator._nth,
      hasText: locator._hasText,
    },
  )
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

export const toHaveCount = (locator, { count }) => {
  const elements = QuerySelectorWithOptions.querySelector(locator._selector)
  const actualCount = elements.length
  return {
    actual: actualCount,
  }
}

const stringifyElement = (element) => {
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

export const toBeFocused = (locator) => {
  const {activeElement} = document
  const stringifiedActiveElement = stringifyElement(activeElement)
  return {
    actual: stringifiedActiveElement,
  }
}

export const toHaveClass = (locator, { className }) => {
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

export const toHaveId = (locator) => {
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

export const toHaveCss = (locator, { key }) => {
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
