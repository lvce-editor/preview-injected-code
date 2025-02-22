import type { Api } from '../Api/Api.ts'
import * as Callback from '../Callback/Callback.ts'
import * as Command from '../Command/Command.ts'
import * as PortState from '../PortState/PortState.ts'

export const apiFactory = (commandMap: any): Api => {
  Command.register(commandMap)
  return {
    async invoke(method: string, ...params: any[]) {
      const { id, promise } = Callback.registerPromise()
      const port = PortState.get()
      port.postMessage({
        jsonrpc: '2.0',
        id,
        method,
        params,
      })
      const response = await promise
      // @ts-ignore
      if (response && 'error' in response) {
        // @ts-ignore
        throw new Error(response.error.message)
      }
      // TODO unwrap jsonrpc result
      return response
    },
  }
}
