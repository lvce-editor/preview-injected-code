import * as ConditionValues from '../ConditionValues/ConditionValues.ts'

export const checkConditionError = (
  fnName: string,
  ...params: readonly any[]
): Promise<any> => {
  const fn = ConditionValues[fnName]
  return fn(...params)
}
