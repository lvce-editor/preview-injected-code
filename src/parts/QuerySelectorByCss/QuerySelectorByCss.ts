export const querySelectorByCss = (selector: string): readonly Element[] => {
  return [...document.querySelectorAll(selector)]
}
