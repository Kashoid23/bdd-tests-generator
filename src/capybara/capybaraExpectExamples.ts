import {
  expectToHaveButton,
  expectToHaveLink, expectToHavePage,
  expectToHaveSelector,
  expectToHaveSelectorWithText,
  expectToHaveText
} from './expectExamples';
import { ElementData } from '../elementData'

export const capybaraExpectExamples = (elementData: ElementData) => {
  window.alert('Capybara expect examples copied to clipboard!');

  switch (elementData.tag) {
    case 'A':
      return [
        expectToHaveLink(elementData.content),
        expectToHaveSelector(elementData.class),
        expectToHaveSelector(elementData.id),
        expectToHaveSelectorWithText({
          selector: elementData.class,
          text: elementData.content
        }),
        expectToHavePage(window.location.href)
      ]
    case 'BUTTON':
      return [
        expectToHaveButton(elementData.content),
        expectToHaveSelector(elementData.class),
        expectToHaveSelector(elementData.id),
        expectToHaveSelectorWithText({
          selector: elementData.class,
          text: elementData.content
        }),
        expectToHavePage(window.location.href)
      ]
    case 'INPUT' || 'TEXTAREA':
      if (elementData.type === 'checkbox') {
        return [
          expectToHaveSelector(elementData.class),
          expectToHaveSelector(elementData.id),
          expectToHavePage(window.location.href)
        ]
      } else if (elementData.type === 'radio') {
        return [
          expectToHaveSelector(elementData.class),
          expectToHaveSelector(elementData.id),
          expectToHavePage(window.location.href)
        ]
      } else {
        return [
          expectToHaveSelector(elementData.class),
          expectToHaveSelector(elementData.id),
          expectToHavePage(window.location.href)
        ]
      }
    case 'SELECT':
      return [
        expectToHaveSelector(elementData.class),
        expectToHaveSelector(elementData.id),
        expectToHavePage(window.location.href)
      ]
    default:
      return [
        expectToHaveText(elementData.content),
        expectToHaveSelector(elementData.class),
        expectToHaveSelector(elementData.id),
        expectToHaveSelectorWithText({
          selector: elementData.class,
          text: elementData.content
        }),
        expectToHavePage(window.location.href)
      ]
  }
}
