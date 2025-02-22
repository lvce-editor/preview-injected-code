export const querySelectorByText = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  root: Element,
  text: string,
): readonly HTMLElement[] => {
  let node: Node | null
  const elements: HTMLElement[] = []
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null)
  while ((node = walk.nextNode())) {
    if (node.nodeValue === text) {
      elements.push(node.parentNode as HTMLElement)
    }
  }
  return elements
}
