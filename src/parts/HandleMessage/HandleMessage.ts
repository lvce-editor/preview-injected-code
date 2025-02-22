import * as Callback from '../Callback/Callback.ts'
import * as Command from '../Command/Command.ts'
import * as HandleMessageFromTestPort from '../HandleMessageFromTestPort/HandleMessageFromTestPort.ts'
import * as PortState from '../PortState/PortState.ts'

const isJsonRpcResponse = (message: any): boolean => {
  return 'result' in message || 'error' in message
}

const handleMessage = async (event: any): Promise<void> => {
  const message = event.data
  if (isJsonRpcResponse(message)) {
    Callback.resolve(message.id, message)
    return
  }
  const { method, params } = message
  const result = await Command.execute(method, ...params)
  if (message.id) {
    event.target.postMessage({
      jsonrpc: '2.0',
      id: message.id,
      result,
    })
  }
}

export const handleWindowMessage = (event: any): void => {
  const { data } = event
  const message = data
  const innerPort = message.params[0]
  const portType = message.params[1]
  if (portType === 'test') {
    innerPort.onmessage = HandleMessageFromTestPort.handleMessageFromTestPort
    innerPort.postMessage('ready')
  } else {
    innerPort.onmessage = handleMessage
    innerPort.postMessage('ready')
    PortState.set(innerPort)
  }
}
