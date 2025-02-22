// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createObjectUrl = (blob: Blob): string => {
  const url = URL.createObjectURL(blob)
  return url
}
