import * as CheckConditionError from '../CheckConditionError/CheckConditionError.ts'
import * as CheckSingleElementCondition from '../CheckSingleElementCondition/CheckSingleElementCondition.ts'
import * as CreateObjectUrl from '../CreateObjectUrl/CreateObjectUrl.ts'
import * as PerformAction from '../PerformAction/PerformAction.ts'

export const testCommandMap = {
  createObjectUrl: CreateObjectUrl.createObjectUrl,
  'TestFrameWork.performAction': PerformAction.performAction,
  'TestFrameWork.checkConditionError': CheckConditionError.checkConditionError,
  'TestFrameWork.checkSingleElementCondition': CheckSingleElementCondition.checkSingleElementCondition,
}
