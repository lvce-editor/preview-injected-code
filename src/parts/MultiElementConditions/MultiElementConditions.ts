export const toHaveCount = (
  elements: readonly HTMLElement[],
  { count }: { readonly count: number },
): boolean => {
  return elements.length === count
}

export const toBeHidden = (elements: readonly HTMLElement[]): boolean => {
  return elements.length === 0
}
