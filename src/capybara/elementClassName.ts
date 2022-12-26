export const elementClassName = (element: HTMLElement) => element.className ?
    element.className.length > 1
      ? `.${element.className.split(' ').join('.')}`
      : `.${element.className}`
  : null
