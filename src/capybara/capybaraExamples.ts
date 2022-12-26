import {
  clickLink, clickButton, check,
  uncheck, choose, findClick,
  findTextClick, fillInWith, selectFrom, within, visit,
} from './examples'
import { ElementData } from '../elementData'
import { className } from "./className";

function capybaraContainerExamples(element: HTMLElement, child: string) {
  const closestParentDivWithId = element.closest('div[id]') as HTMLElement
  const closestParentDivWithClass = element.closest('div[class]') as HTMLElement

  if (child) {
    return [
      within({ selector: closestParentDivWithId.id, child: child }),
      within({ selector: className(closestParentDivWithClass), child: child })
    ]
  } else {
    return []
  }
}

export const capybaraExamples = (elementData: ElementData) => {
  switch (elementData.tag) {
    case 'A':
      return [
        clickLink(elementData.content),
        findTextClick({
          selector: elementData.class,
          text: elementData.content
        }),
        findClick(elementData.id),
        findClick(elementData.class),
        ...capybaraContainerExamples(elementData.target, clickLink(elementData.content))
      ]
    case 'BUTTON':
      return [
        clickButton(elementData.content),
        findTextClick({
          selector: elementData.class,
          text: elementData.content
        }),
        findClick(elementData.id),
        findClick(elementData.class),
        ...capybaraContainerExamples(elementData.target, clickButton(elementData.content))
      ]
    case 'INPUT' || 'TEXTAREA':
      if (elementData.type === 'checkbox') {
        return [
          check(elementData.content),
          check(elementData.name),
          uncheck(elementData.content),
          uncheck(elementData.name),
          ...capybaraContainerExamples(elementData.target, check(elementData.name)),
          ...capybaraContainerExamples(elementData.target, uncheck(elementData.name))
        ]
      } else if (elementData.type === 'radio') {
        return [
          choose(elementData.content),
          choose(elementData.name)
        ]
      } else {
        return [
          fillInWith({
            selector: elementData.name,
            value: elementData.value
          }),
          fillInWith({
            selector: elementData.placeholder,
            value: elementData.value
          }),
          findClick(elementData.id),
          findClick(elementData.class),
          ...capybaraContainerExamples(elementData.target, fillInWith({
            selector: elementData.name,
            value: elementData.value
          })),
          ...capybaraContainerExamples(elementData.target, fillInWith({
            selector: elementData.placeholder,
            value: elementData.value
          }))
        ]
      }
    case 'SELECT':
      return [
        selectFrom({
          option: 'Option',
          selector: elementData.placeholder
        }),
        findClick(elementData.id),
        findClick(elementData.class),
        ...capybaraContainerExamples(elementData.target, selectFrom({
          option: 'Option',
          selector: elementData.placeholder
        }))
      ]
    default:
      return [
        findClick(elementData.content),
        findTextClick({
          selector: elementData.class,
          text: elementData.content
        }),
        findClick(elementData.id),
        findClick(elementData.class),
        ...capybaraContainerExamples(elementData.target, findClick(elementData.content)),
        ...capybaraContainerExamples(elementData.target, findClick(elementData.id)),
        ...capybaraContainerExamples(elementData.target, findClick(elementData.class))
      ]
  }
}

export const capybaraVisitExample = (href: string) => {
  return visit(href)
}
