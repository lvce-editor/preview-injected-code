export const handleMessageFromTestPort = (event: any): void => {
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
