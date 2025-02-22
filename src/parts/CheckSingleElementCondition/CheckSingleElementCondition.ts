import { AssertionError } from '../AssertionError/AssertionError.ts'
import * as ConditionErrorMap from '../ConditionErrorMap/ConditionErrorMap.ts'
import * as QuerySelectorWithOptions from '../QuerySelectorWithOptions/QuerySelectorWithOptions.ts'
import * as SingleElementConditions from '../SingleElementConditions/SingleElementConditions.ts'
import * as Time from '../Time/Time.ts'
import * as Timeout from '../Timeout/Timeout.ts'

const maxTimeout = 2000

export const checkSingleElementCondition = async (
  locator: any,
  fnName: string,
  options: any,
): Promise<void> => {
  const startTime = Time.getTimeStamp()
  const endTime = startTime + maxTimeout
  let currentTime = startTime
  const fn = SingleElementConditions[fnName]
  while (currentTime < endTime) {
    const element = QuerySelectorWithOptions.querySelectorWithOptions(
      locator._selector,
      {
        hasText: locator._hasText,
        nth: locator._nth,
      },
    )
    if (element) {
      const successful = fn(element, options)
      if (successful) {
        return
      }
    }
    await Timeout.waitForMutation(100)
    currentTime = Time.getTimeStamp()
  }
  const errorMessageFn = ConditionErrorMap.getFunction(fnName)
  const message = errorMessageFn(locator, options)
  throw new AssertionError(message)
}
