import {
  expectToHaveButton,
  expectToHaveLink, expectToHavePage,
  expectToHaveSelector,
  expectToHaveSelectorWithText,
  expectToHaveText
} from "./expectExamples";
import { capybaraExpectExamplesData } from './capybaraElementData'

export const capybaraExpectExamples = (element: HTMLElement) => {
  console.log("Capybara expect examples copied to clipboard!")

  switch (element.tagName) {
    case 'A':
      return `
        ${expectToHaveLink(capybaraExpectExamplesData(element).content)}
        ${expectToHaveSelector(capybaraExpectExamplesData(element).class)}
        ${expectToHaveSelector(capybaraExpectExamplesData(element).id)}
        ${expectToHaveSelectorWithText({
          selector: capybaraExpectExamplesData(element).class,
          text: capybaraExpectExamplesData(element).content
        })}
        ${expectToHavePage(window.location.href)}
      `
    case 'BUTTON':
      return `
        ${expectToHaveButton(capybaraExpectExamplesData(element).content)}
        ${expectToHaveSelector(capybaraExpectExamplesData(element).class)}
        ${expectToHaveSelector(capybaraExpectExamplesData(element).id)}
        ${expectToHaveSelectorWithText({
          selector: capybaraExpectExamplesData(element).class,
          text: capybaraExpectExamplesData(element).content
        })}
        ${expectToHavePage(window.location.href)}
      `
    case 'INPUT' || 'TEXTAREA':
      // @ts-ignore
      if (element.type === 'checkbox') {
        return `
          ${expectToHaveSelector(capybaraExpectExamplesData(element).class)}
          ${expectToHaveSelector(capybaraExpectExamplesData(element).id)}
          ${expectToHavePage(window.location.href)}
        `
        // @ts-ignore
      } else if (element.type === 'radio') {
        return `
          ${expectToHaveSelector(capybaraExpectExamplesData(element).class)}
          ${expectToHaveSelector(capybaraExpectExamplesData(element).id)}
          ${expectToHavePage(window.location.href)}
        `
      } else {
        return `
          ${expectToHaveSelector(capybaraExpectExamplesData(element).class)}
          ${expectToHaveSelector(capybaraExpectExamplesData(element).id)}
          ${expectToHavePage(window.location.href)}
        `
      }
    case 'SELECT':
      return `
        ${expectToHaveSelector(capybaraExpectExamplesData(element).class)}
        ${expectToHaveSelector(capybaraExpectExamplesData(element).id)}
        ${expectToHavePage(window.location.href)}
      `
    default:
      return `
        ${expectToHaveText(capybaraExpectExamplesData(element).content)}
        ${expectToHaveSelector(capybaraExpectExamplesData(element).class)}
        ${expectToHaveSelector(capybaraExpectExamplesData(element).id)}
        ${expectToHaveSelectorWithText({
          selector: capybaraExpectExamplesData(element).class,
          text: capybaraExpectExamplesData(element).content
        })}
        ${expectToHavePage(window.location.href)}
      `
  }
}
