import * as Callback from '../Callback/Callback.ts'
import * as Command from '../Command/Command.ts'
import * as PortState from '../PortState/PortState.ts'

const isJsonRpcResponse = (message: any) => {
  return 'result' in message || 'error' in message
}

const handleMessage = async (event: any) => {
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

const handleMessageFromTestPort = (event: any) => {
  // TODO invoke test function and send back result
  const { data, target } = event
  const { method, params, id } = data
  if (method === 'createObjectUrl') {
    const blob = params[0]
    const url = URL.createObjectURL(blob)
    target.postMessage({
      jsonrpc: '2.0',
      id,
      result: url,
    })
  } else {
    throw new Error('unsupported method')
  }
}

export const handleWindowMessage = (event: any) => {
  const { data } = event
  const message = data
  const innerPort = message.params[0]
  const portType = message.params[1]
  if (portType === 'test') {
    innerPort.onmessage = handleMessageFromTestPort
    innerPort.postMessage('ready')
  } else {
    innerPort.onmessage = handleMessage
    innerPort.postMessage('ready')
    PortState.set(innerPort)
  }
}
