export const toBeVisible = (element: HTMLElement): boolean => {
  // @ts-ignore
  if (typeof element.isVisible === 'function') {
    // @ts-ignore
    return element.isVisible()
  }
  return element.isConnected
}

export const toHaveValue = (
  element: HTMLInputElement | HTMLTextAreaElement,
  { value }: { value: string },
): boolean => {
  return element.value === value
}

export const toHaveText = (
  element: HTMLElement,
  { text }: { text: string },
): boolean => {
  return element.textContent === text
}

export const toContainText = (
  element: HTMLElement,
  { text }: { text: string },
): boolean => {
  // @ts-ignore
  return element.textContent.includes(text)
}

export const toHaveAttribute = (
  element: HTMLElement,
  { key, value }: { key: string; value: string },
): boolean => {
  const attribute = element.getAttribute(key)
  return attribute === value
}

export const toBeFocused = (element: HTMLElement): boolean => {
  return element === document.activeElement
}

export const toHaveClass = (
  element: HTMLElement,
  { className }: { className: string },
): boolean => {
  return element.classList.contains(className)
}

export const toHaveId = (
  element: HTMLElement,
  { id }: { id: string },
): boolean => {
  return element.id === id
}

export const toHaveCss = (
  element: HTMLElement,
  { key, value }: { key: string; value: string | RegExp },
): boolean => {
  const style = getComputedStyle(element)
  const actualValue = style[key]
  if (value instanceof RegExp) {
    return value.test(actualValue)
  }
  return actualValue === value
}
