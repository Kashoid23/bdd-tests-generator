import {
  clickLink, clickButton, check,
  uncheck, choose, findClick,
  findTextClick, fillInWith, selectFrom, within, visit,
} from "./examples"
import { elementData } from './elementData'

function capybaraContainerExamples(element: HTMLElement, child: string) {
  const closestParentDivWithId = element.closest('div[id]') as HTMLElement
  const closestParentDivWithClass = element.closest('div[class]') as HTMLElement

  if (child) {
    return `
    ${within({ selector: elementData(closestParentDivWithId).id, child: child })}

    ${within({ selector: elementData(closestParentDivWithClass).class, child: child })}
  `
  } else {
    return ''
  }
}

export const capybaraExamples = (element: HTMLElement) => {
  console.log("Capybara examples copied to clipboard!")

  switch (element.tagName) {
    case 'A':
      return `
        ${visit(window.location.href)}
        ${clickLink(elementData(element).content)}
        ${findTextClick({
          selector: elementData(element).class,
          text: elementData(element).content
        })}
        ${findClick(elementData(element).id)}
        ${findClick(elementData(element).class)}
        ${capybaraContainerExamples(element, clickLink(elementData(element).content))}
      `
    case 'BUTTON':
      return `
        ${visit(window.location.href)}
        ${clickButton(elementData(element).content)}
        ${findTextClick({
          selector: elementData(element).class,
          text: elementData(element).content
        })}
        ${findClick(elementData(element).id)}
        ${findClick(elementData(element).class)}
        ${capybaraContainerExamples(element, clickButton(elementData(element).content))}
      `
    case 'INPUT' || 'TEXTAREA':
      // @ts-ignore
      if (element.type === 'checkbox') {
        return `
          ${visit(window.location.href)}
          ${check(elementData(element).content)}
          ${check(elementData(element).name)}
          ${uncheck(elementData(element).content)}
          ${uncheck(elementData(element).name)}
          ${capybaraContainerExamples(element, check(elementData(element).name))}
          ${capybaraContainerExamples(element, uncheck(elementData(element).name))}
        `
        // @ts-ignore
      } else if (element.type === 'radio') {
        return `
          ${visit(window.location.href)}
          ${choose(elementData(element).content)}
          ${choose(elementData(element).name)}
        `
      } else {
        return `
          ${visit(window.location.href)}
          ${fillInWith({
            selector: elementData(element).name,
            value: elementData(element).value
          })}
          ${fillInWith({
            selector: elementData(element).placeholder,
            value: elementData(element).value
          })}
          ${findClick(elementData(element).id)}
          ${findClick(elementData(element).class)}
          ${capybaraContainerExamples(element, fillInWith({
            selector: elementData(element).name,
            value: elementData(element).value
           }))}
          ${capybaraContainerExamples(element, fillInWith({
            selector: elementData(element).placeholder,
            value: elementData(element).value
          }))}
        `
      }
    case 'SELECT':
      return `
        ${visit(window.location.href)}
        ${selectFrom({
          option: 'Option',
          selector: elementData(element).placeholder
        })}
        ${findClick(elementData(element).id)}
        ${findClick(elementData(element).class)}
        ${capybaraContainerExamples(element, selectFrom({
          option: 'Option',
          selector: elementData(element).placeholder
        }))}
      `
    default:
      return `
        ${visit(window.location.href)}
        ${findClick(elementData(element).content)}
        ${findTextClick({
          selector: elementData(element).class,
          text: elementData(element).content
        })}
        ${findClick(elementData(element).id)}
        ${findClick(elementData(element).class)}
        ${capybaraContainerExamples(element, findClick(elementData(element).content))}
        ${capybaraContainerExamples(element, findClick(elementData(element).id))}
        ${capybaraContainerExamples(element, findClick(elementData(element).class))}
      `
  }
}
