import { apiFactory } from '../ApiFactory/ApiFactory.ts'
import * as HandleWindowMessage from '../HandleMessage/HandleMessage.ts'

export const main = (): void => {
  window.addEventListener('message', HandleWindowMessage.handleWindowMessage)

  const apiKey = 'lvceRpc'
  // @ts-ignore
  globalThis[apiKey] = apiFactory
}
