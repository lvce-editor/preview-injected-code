export const createObjectUrl = (blob: Blob): string => {
  const url = URL.createObjectURL(blob)
  return url
}
