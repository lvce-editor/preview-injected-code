let port: any = undefined

export const set = (value: any): void => {
  port = value
}

export const get = (): any => {
  return port
}
