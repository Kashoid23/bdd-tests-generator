import { copyToClipboard } from "./copyToClipboard";
import {
  clickLink, clickButton, check,
  uncheck, choose, findClick,
  findTextClick, fillInWith, selectFrom, within,
} from "./examples"

interface CapybaraExamplesDataResult {
  tag: string;
  id: string;
  class: string;
  name: string | null;
  content: string | undefined;
  placeholder: string | null;
  value: string | null;
}

function capybaraExamplesData(element: HTMLElement): CapybaraExamplesDataResult {
  return {
    tag: element.tagName ? element.tagName.toLowerCase() : "",
    id: element.id ? `#${element.id}` : "",
    class: element.className.length > 1 ? `.${element.className.split(' ').join('.')}` : element.className,
    name: element.getAttribute("name"),
    content: element.innerText?.trim(),
    placeholder: element.getAttribute("placeholder"),
    value: element.getAttribute("value"),
  }
}

function capybaraContainerExamples(element: HTMLElement, child: string) {
  const closestParentDivWithId = element.closest('div[id]') as HTMLElement
  const closestParentDivWithClass = element.closest('div[class]') as HTMLElement

  if (child) {
    return `
    ${within({ selector: capybaraExamplesData(closestParentDivWithId).id, child: child })}

    ${within({ selector: capybaraExamplesData(closestParentDivWithClass).class, child: child })}
  `
  } else {
    return ''
  }
}

export const capybaraExamples = (element: HTMLElement) => {
  console.log("Examples copied to clipboard!")

  switch (element.tagName) {
    case 'A':
      return `
        ${clickLink(capybaraExamplesData(element).content)}
        ${findTextClick({
          selector: capybaraExamplesData(element).class,
          text: capybaraExamplesData(element).content
        })}
        ${findClick(capybaraExamplesData(element).id)}
        ${findClick(capybaraExamplesData(element).class)}
        ${capybaraContainerExamples(element, clickLink(capybaraExamplesData(element).content))}
      `
    case 'BUTTON':
      return `
        ${clickButton(capybaraExamplesData(element).content)}
        ${findTextClick({
          selector: capybaraExamplesData(element).class,
          text: capybaraExamplesData(element).content
        })}
        ${findClick(capybaraExamplesData(element).id)}
        ${findClick(capybaraExamplesData(element).class)}
        ${capybaraContainerExamples(element, clickButton(capybaraExamplesData(element).content))}
      `
    case 'INPUT' || 'TEXTAREA':
      // @ts-ignore
      if (element.type == 'checkbox') {
        return `
          ${check(capybaraExamplesData(element).content)}
          ${check(capybaraExamplesData(element).name)}
          ${uncheck(capybaraExamplesData(element).content)}
          ${uncheck(capybaraExamplesData(element).name)}
          ${capybaraContainerExamples(element, check(capybaraExamplesData(element).name))}
          ${capybaraContainerExamples(element, uncheck(capybaraExamplesData(element).name))}
        `
        // @ts-ignore
      } else if (element.type == 'radio') {
        return `
          ${choose(capybaraExamplesData(element).content)}
          ${choose(capybaraExamplesData(element).name)}
        `
      } else {
        return `
          ${fillInWith({
            selector: capybaraExamplesData(element).name,
            value: capybaraExamplesData(element).value
          })}
          ${fillInWith({
            selector: capybaraExamplesData(element).placeholder,
            value: capybaraExamplesData(element).value
          })}
          ${findClick(capybaraExamplesData(element).id)}
          ${findClick(capybaraExamplesData(element).class)}
          ${capybaraContainerExamples(element, fillInWith({
            selector: capybaraExamplesData(element).name,
            value: capybaraExamplesData(element).value
           }))}
          ${capybaraContainerExamples(element, fillInWith({
            selector: capybaraExamplesData(element).placeholder,
            value: capybaraExamplesData(element).value
          }))}
        `
      }
    case 'SELECT':
      return `
        ${selectFrom({
          option: 'Option',
          selector: capybaraExamplesData(element).placeholder
        })}
        ${findClick(capybaraExamplesData(element).id)}
        ${findClick(capybaraExamplesData(element).class)}
        ${capybaraContainerExamples(element, selectFrom({
          option: 'Option',
          selector: capybaraExamplesData(element).placeholder
        }))}
      `
    default:
      return `
        ${findClick(capybaraExamplesData(element).content)}
        ${findTextClick({
          selector: capybaraExamplesData(element).class,
          text: capybaraExamplesData(element).content
        })}
        ${findClick(capybaraExamplesData(element).id)}
        ${findClick(capybaraExamplesData(element).class)}
        ${capybaraContainerExamples(element, findClick(capybaraExamplesData(element).content))}
        ${capybaraContainerExamples(element, findClick(capybaraExamplesData(element).id))}
        ${capybaraContainerExamples(element, findClick(capybaraExamplesData(element).class))}
      `
  }
}

export const copyToClipboardCapybaraExamples = (element: HTMLElement) => {
  copyToClipboard(capybaraExamples(element))
}
