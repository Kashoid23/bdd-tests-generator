import {
  clickLink, clickButton, check,
  uncheck, choose, findClick,
  findTextClick, fillInWith, selectFrom, within, visit,
} from './examples'
import { ElementData } from '../elementData'

function capybaraContainerExamples(closestParent: { id: string | null; class: string | null; }, child: string) {
  if (child) {
    return [
      within({ selector: closestParent.id, child: child }),
      within({ selector: closestParent.class, child: child })
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
        ...capybaraContainerExamples(elementData.closestParent, clickLink(elementData.content))
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
        ...capybaraContainerExamples(elementData.closestParent, clickButton(elementData.content))
      ]
    case 'INPUT' || 'TEXTAREA':
      if (elementData.type === 'checkbox') {
        return [
          check(elementData.content),
          check(elementData.name),
          uncheck(elementData.content),
          uncheck(elementData.name),
          ...capybaraContainerExamples(elementData.closestParent, check(elementData.name)),
          ...capybaraContainerExamples(elementData.closestParent, uncheck(elementData.name))
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
          ...capybaraContainerExamples(elementData.closestParent, fillInWith({
            selector: elementData.name,
            value: elementData.value
          })),
          ...capybaraContainerExamples(elementData.closestParent, fillInWith({
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
        ...capybaraContainerExamples(elementData.closestParent, selectFrom({
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
        ...capybaraContainerExamples(elementData.closestParent, findClick(elementData.content)),
        ...capybaraContainerExamples(elementData.closestParent, findClick(elementData.id)),
        ...capybaraContainerExamples(elementData.closestParent, findClick(elementData.class))
      ]
  }
}

export const capybaraVisitExample = (href: string) => {
  return visit(href)
}
