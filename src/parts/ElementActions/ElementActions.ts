import * as DomEventType from '../DomEventType/DomEventType.ts'

export const mouseEvent = (
  element: Element,
  eventType: string,
  options: any,
): void => {
  const event = new MouseEvent(eventType, options)
  element.dispatchEvent(event)
}

export const mouseDown = (element: Element, options: any): void => {
  mouseEvent(element, DomEventType.MouseDown, options)
}

export const mouseUp = (element: Element, options: any): void => {
  mouseEvent(element, DomEventType.MouseUp, options)
}

export const contextMenu = (element: Element, options: any): void => {
  mouseEvent(element, DomEventType.ContextMenu, options)
}

export const click = (element: Element, options: any): void => {
  mouseDown(element, options)
  mouseEvent(element, DomEventType.Click, options)
  mouseUp(element, options)
  if (options.button === 2 /* right */) {
    contextMenu(element, options)
  }
}

export const hover = (element: Element, options: any): void => {
  mouseEvent(element, DomEventType.MouseEnter, options)
}

export const type = (
  element: HTMLInputElement | HTMLTextAreaElement,
  options: any,
): void => {
  element.value = options.text
}

export const keyboardEvent = (
  element: Element,
  eventType: string,
  options: any,
): void => {
  const event = new KeyboardEvent(eventType, options)
  element.dispatchEvent(event)
}

export const keyDown = (element: Element, options: any): void => {
  keyboardEvent(element, DomEventType.KeyDown, options)
}

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

export const dispatchEvent = (element: Element, options: any): void => {
  const EventClass = getEventClass(options.type)
  const event = new EventClass(options.type, options.init)
  element.dispatchEvent(event)
}
