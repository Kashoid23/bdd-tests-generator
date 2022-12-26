export const className = (element: HTMLElement) => element.className.length > 1
  ? `.${element.className.split(' ').join('.')}`
  : element.className
