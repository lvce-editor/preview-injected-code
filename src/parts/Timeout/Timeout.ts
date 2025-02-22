export const short = async (): Promise<void> => {
  const { resolve, promise } = Promise.withResolvers()
  setTimeout(resolve, 1000)
  await promise
}

export const waitForMutation = async (maxDelay: number): Promise<void> => {
  const disposables: any[] = []
  const { resolve: resolve1, promise: promise1 } = Promise.withResolvers()
  const { resolve: resolve2, promise: promise2 } = Promise.withResolvers()

  const timeout = setTimeout(resolve1, maxDelay)
  disposables.push(() => {
    clearTimeout(timeout)
  })

  const callback = (mutations) => {
    resolve2(undefined)
  }
  const observer = new MutationObserver(callback)
  observer.observe(document.body, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  })
  disposables.push(() => {
    observer.disconnect()
  })

  await Promise.race([promise1, promise2])
  for (const disposable of disposables) {
    disposable()
  }
}
