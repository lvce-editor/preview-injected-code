export const querySelectorByCss = (
  selector: string,
): readonly HTMLElement[] => {
  return Array.from(document.querySelectorAll(selector))
}
