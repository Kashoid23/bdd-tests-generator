import {
  expectToHaveButton,
  expectToHaveLink, expectToHavePage,
  expectToHaveSelector,
  expectToHaveSelectorWithText,
  expectToHaveText
} from "./expectExamples";
import { expectElementData } from './elementData'

export const capybaraExpectExamples = (element: HTMLElement) => {
  console.log("Capybara expect examples copied to clipboard!")

  switch (element.tagName) {
    case 'A':
      return [
        expectToHaveLink(expectElementData(element).content),
        expectToHaveSelector(expectElementData(element).class),
        expectToHaveSelector(expectElementData(element).id),
        expectToHaveSelectorWithText({
          selector: expectElementData(element).class,
          text: expectElementData(element).content
        }),
        expectToHavePage(window.location.href)
      ]
    case 'BUTTON':
      return [
        expectToHaveButton(expectElementData(element).content),
        expectToHaveSelector(expectElementData(element).class),
        expectToHaveSelector(expectElementData(element).id),
        expectToHaveSelectorWithText({
          selector: expectElementData(element).class,
          text: expectElementData(element).content
        }),
        expectToHavePage(window.location.href)
      ]
    case 'INPUT' || 'TEXTAREA':
      // @ts-ignore
      if (element.type === 'checkbox') {
        return [
          expectToHaveSelector(expectElementData(element).class),
          expectToHaveSelector(expectElementData(element).id),
          expectToHavePage(window.location.href)
        ]
        // @ts-ignore
      } else if (element.type === 'radio') {
        return [
          expectToHaveSelector(expectElementData(element).class),
          expectToHaveSelector(expectElementData(element).id),
          expectToHavePage(window.location.href)
        ]
      } else {
        return [
          expectToHaveSelector(expectElementData(element).class),
          expectToHaveSelector(expectElementData(element).id),
          expectToHavePage(window.location.href)
        ]
      }
    case 'SELECT':
      return [
        expectToHaveSelector(expectElementData(element).class),
        expectToHaveSelector(expectElementData(element).id),
        expectToHavePage(window.location.href)
      ]
    default:
      return [
        expectToHaveText(expectElementData(element).content),
        expectToHaveSelector(expectElementData(element).class),
        expectToHaveSelector(expectElementData(element).id),
        expectToHaveSelectorWithText({
          selector: expectElementData(element).class,
          text: expectElementData(element).content
        }),
        expectToHavePage(window.location.href)
      ]
  }
}
