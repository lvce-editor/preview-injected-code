import * as ConditionValues from '../ConditionValues/ConditionValues.ts'
import * as GetConditionName from '../GetConditionName/GetConditionName.ts'

export const checkConditionError = (fnName: number | string, ...params: readonly any[]): Promise<any> => {
  const fn = ConditionValues[GetConditionName.getConditionName(fnName)]
  return fn(...params)
}
