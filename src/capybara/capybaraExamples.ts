import {
  clickLink, clickButton, check,
  uncheck, choose, findClick,
  findTextClick, fillInWith, selectFrom, within, visit,
} from './examples'
import { elementData } from '../elementData'

function capybaraContainerExamples(element: HTMLElement, child: string) {
  const closestParentDivWithId = element.closest('div[id]') as HTMLElement
  const closestParentDivWithClass = element.closest('div[class]') as HTMLElement

  if (child) {
    return [
      within({ selector: elementData(closestParentDivWithId).id, child: child }),
      within({ selector: elementData(closestParentDivWithClass).class, child: child })
    ]
  } else {
    return []
  }
}

export const capybaraExamples = (element: HTMLElement) => {
  switch (element.tagName) {
    case 'A':
      return [
        clickLink(elementData(element).content),
        findTextClick({
          selector: elementData(element).class,
          text: elementData(element).content
        }),
        findClick(elementData(element).id),
        findClick(elementData(element).class),
        ...capybaraContainerExamples(element, clickLink(elementData(element).content))
      ]
    case 'BUTTON':
      return [
        clickButton(elementData(element).content),
        findTextClick({
          selector: elementData(element).class,
          text: elementData(element).content
        }),
        findClick(elementData(element).id),
        findClick(elementData(element).class),
        ...capybaraContainerExamples(element, clickButton(elementData(element).content))
      ]
    case 'INPUT' || 'TEXTAREA':
      // @ts-ignore
      if (element.type === 'checkbox') {
        return [
          check(elementData(element).content),
          check(elementData(element).name),
          uncheck(elementData(element).content),
          uncheck(elementData(element).name),
          ...capybaraContainerExamples(element, check(elementData(element).name)),
          ...capybaraContainerExamples(element, uncheck(elementData(element).name))
        ]
        // @ts-ignore
      } else if (element.type === 'radio') {
        return [
          choose(elementData(element).content),
          choose(elementData(element).name)
        ]
      } else {
        return [
          fillInWith({
            selector: elementData(element).name,
            value: elementData(element).value
          }),
          fillInWith({
            selector: elementData(element).placeholder,
            value: elementData(element).value
          }),
          findClick(elementData(element).id),
          findClick(elementData(element).class),
          ...capybaraContainerExamples(element, fillInWith({
            selector: elementData(element).name,
            value: elementData(element).value
          })),
          ...capybaraContainerExamples(element, fillInWith({
            selector: elementData(element).placeholder,
            value: elementData(element).value
          }))
        ]
      }
    case 'SELECT':
      return [
        selectFrom({
          option: 'Option',
          selector: elementData(element).placeholder
        }),
        findClick(elementData(element).id),
        findClick(elementData(element).class),
        ...capybaraContainerExamples(element, selectFrom({
          option: 'Option',
          selector: elementData(element).placeholder
        }))
      ]
    default:
      return [
        findClick(elementData(element).content),
        findTextClick({
          selector: elementData(element).class,
          text: elementData(element).content
        }),
        findClick(elementData(element).id),
        findClick(elementData(element).class),
        ...capybaraContainerExamples(element, findClick(elementData(element).content)),
        ...capybaraContainerExamples(element, findClick(elementData(element).id)),
        ...capybaraContainerExamples(element, findClick(elementData(element).class))
      ]
  }
}

export const capybaraVisitExample = (href: string) => {
  return visit(href)
}
