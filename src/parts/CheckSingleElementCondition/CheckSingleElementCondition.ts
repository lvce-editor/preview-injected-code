import type { ConditionResult } from '../ConditionResult/ConditionResult.ts'
import * as QuerySelectorWithOptions from '../QuerySelectorWithOptions/QuerySelectorWithOptions.ts'
import * as SingleElementConditions from '../SingleElementConditions/SingleElementConditions.ts'
import * as Time from '../Time/Time.ts'
import * as Timeout from '../Timeout/Timeout.ts'

const maxTimeout = 2000

export const checkSingleElementCondition = async (locator: any, fnName: string, options: any): Promise<ConditionResult> => {
  const startTime = Time.getTimeStamp()
  const endTime = startTime + maxTimeout
  let currentTime = startTime
  const fn = SingleElementConditions[fnName]
  while (currentTime < endTime) {
    const element = QuerySelectorWithOptions.querySelectorWithOptions(locator._selector, {
      hasText: locator._hasText,
      nth: locator._nth,
    })
    if (element) {
      const successful = fn(element, options)
      if (successful) {
        return {
          error: false,
        }
      }
    }
    await Timeout.waitForMutation(100)
    currentTime = Time.getTimeStamp()
  }
  return {
    error: true,
  }
}
