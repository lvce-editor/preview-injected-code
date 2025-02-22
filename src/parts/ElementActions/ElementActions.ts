import * as DomEventType from '../DomEventType/DomEventType.ts'

export const mouseEvent = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  element: Element,
  eventType: string,
  options: any,
): void => {
  const event = new MouseEvent(eventType, options)
  element.dispatchEvent(event)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const mouseDown = (element: Element, options: any): void => {
  mouseEvent(element, DomEventType.MouseDown, options)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const mouseUp = (element: Element, options: any): void => {
  mouseEvent(element, DomEventType.MouseUp, options)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const contextMenu = (element: Element, options: any): void => {
  mouseEvent(element, DomEventType.ContextMenu, options)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const click = (element: Element, options: any): void => {
  mouseDown(element, options)
  mouseEvent(element, DomEventType.Click, options)
  mouseUp(element, options)
  if (options.button === 2 /* right */) {
    contextMenu(element, options)
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const hover = (element: Element, options: any): void => {
  mouseEvent(element, DomEventType.MouseEnter, options)
}

export const type = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  element: HTMLInputElement | HTMLTextAreaElement,
  options: any,
): void => {
  element.value = options.text
}

export const keyboardEvent = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  element: Element,
  eventType: string,
  options: any,
): void => {
  const event = new KeyboardEvent(eventType, options)
  element.dispatchEvent(event)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const keyDown = (element: Element, options: any): void => {
  keyboardEvent(element, DomEventType.KeyDown, options)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const keyUp = (element: Element, options: any): void => {
  keyboardEvent(element, DomEventType.KeyUp, options)
}

const getEventClass = (eventType: string): any => {
  switch (eventType) {
    case DomEventType.Wheel:
      return WheelEvent
    case DomEventType.PointerDown:
    case DomEventType.PointerUp:
    case DomEventType.PointerMove:
      return PointerEvent
    default:
      return Event
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const dispatchEvent = (element: Element, options: any): void => {
  const EventClass = getEventClass(options.type)
  const event = new EventClass(options.type, options.init)
  element.dispatchEvent(event)
}
