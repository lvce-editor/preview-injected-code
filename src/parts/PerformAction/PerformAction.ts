import * as Assert from '../Assert/Assert.ts'
import * as ElementActions from '../ElementActions/ElementActions.ts'
import * as QuerySelector from '../QuerySelectorWithOptions/QuerySelectorWithOptions.ts'
import * as Time from '../Time/Time.ts'
import * as Timeout from '../Timeout/Timeout.ts'

const maxTimeout = 2000

export const performAction = async (
  locator: any,
  fnName: string,
  options: any,
): Promise<void> => {
  Assert.object(locator)
  Assert.string(fnName)
  Assert.object(options)
  const startTime = Time.getTimeStamp()
  const endTime = startTime + maxTimeout
  let currentTime = startTime
  const fn = ElementActions[fnName]
  while (currentTime < endTime) {
    const element = QuerySelector.querySelectorWithOptions(locator._selector, {
      hasText: locator._hasText,
      nth: locator._nth,
    })
    if (element) {
      fn(element, options)
      return
    }
    await Timeout.waitForMutation(100)
    currentTime = Time.getTimeStamp()
  }
}
