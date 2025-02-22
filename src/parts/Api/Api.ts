export interface Api {
  readonly invoke: (method: string, ...params: readonly any[]) => Promise<any>
}
