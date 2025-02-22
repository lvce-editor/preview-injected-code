import * as TestCommandMap from '../TestCommandMap/TestCommandMap.ts'

export const handleMessageFromTestPort = async (event: any): Promise<void> => {
  const { data, target } = event
  const { method, params, id } = data
  const fn = TestCommandMap.testCommandMap[method]
  if (!fn) {
    throw new Error('unsupported method')
  }
  const result = await fn(...params)
  target.postMessage({
    jsonrpc: '2.0',
    id,
    result,
  })
}
