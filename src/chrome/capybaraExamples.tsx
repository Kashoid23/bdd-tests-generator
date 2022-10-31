import { copyToClipboard } from "./copyToClipboard";

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
    tag: element.tagName.toLowerCase(),
    id: element.id ? `#${element.id}` : "",
    class: element.className.length > 1 ? `.${element.className.split(' ').join('.')}` : element.className,
    name: element.getAttribute("name"),
    content: element.innerText?.trim(),
    placeholder: element.getAttribute("placeholder"),
    value: element.getAttribute("value"),
  }
}

function capybaraContainerExamples(element: HTMLElement, children: string) {
  const closestParentDivWithId = element.closest('div[id]') as HTMLElement
  const closestParentDivWithClass = element.closest('div[class]') as HTMLElement

  return `
    within "div${capybaraExamplesData(closestParentDivWithId).id}" do
      ${children}
    end

    within "div${capybaraExamplesData(closestParentDivWithClass).class}" do
      ${children}
    end
  `
}

export const capybaraExamples = (element: HTMLElement) => {
  const findAndClickIdOrClassNameCapybaraExamples = `
    ${capybaraExamplesData(element).id && `find("${capybaraExamplesData(element).id}").click`}
    ${capybaraExamplesData(element).class && `find("${capybaraExamplesData(element).class}").click`}
  `

  console.log(capybaraExamplesData(element))

  switch (element.tagName) {
    case 'A':
      return `
        ${capybaraExamplesData(element).content && `click_link("${capybaraExamplesData(element).content}")`}
        ${capybaraExamplesData(element).content && capybaraExamplesData(element).class && `find("${capybaraExamplesData(element).class}", text: "${capybaraExamplesData(element).content}").click`}
        ${findAndClickIdOrClassNameCapybaraExamples}
        ${capybaraExamplesData(element).content && capybaraContainerExamples(element, `click_link("${capybaraExamplesData(element).content}")`)}
      `
    case 'BUTTON':
      return `
        ${capybaraExamplesData(element).content && `click_button("${capybaraExamplesData(element).content}")`}
        ${capybaraExamplesData(element).content && capybaraExamplesData(element).class && `find("${capybaraExamplesData(element).class}", text: "${capybaraExamplesData(element).content}").click`}
        ${findAndClickIdOrClassNameCapybaraExamples}
        ${capybaraExamplesData(element).content && capybaraContainerExamples(element, `click_button("${capybaraExamplesData(element).content}")`)}
      `
    case 'INPUT' || 'TEXTAREA':
      // @ts-ignore
      if (element.type == 'checkbox') {
        return `
          ${capybaraExamplesData(element).content && `check("${capybaraExamplesData(element).content}")`}
          ${capybaraExamplesData(element).name && `check("${capybaraExamplesData(element).name}")`}
          ${capybaraExamplesData(element).content && `uncheck("${capybaraExamplesData(element).content}")`}
          ${capybaraExamplesData(element).name && `uncheck("${capybaraExamplesData(element).name}")`}
          ${capybaraExamplesData(element).name && capybaraContainerExamples(element, `check("${capybaraExamplesData(element).name}")`)}
          ${capybaraExamplesData(element).name && capybaraContainerExamples(element, `uncheck("${capybaraExamplesData(element).name}")`)}
        `
        // @ts-ignore
      } else if (element.type == 'radio') {
        return `
          ${capybaraExamplesData(element).content && `choose("${capybaraExamplesData(element).content}")`}
          ${capybaraExamplesData(element).name && `choose("${capybaraExamplesData(element).name}")`}
        `
      } else {
        return `
          ${capybaraExamplesData(element).name && `fill_in("${capybaraExamplesData(element).name}", with: "${capybaraExamplesData(element).value}")`}
          ${capybaraExamplesData(element).placeholder && `fill_in("${capybaraExamplesData(element).placeholder}", with: "${capybaraExamplesData(element).value}")`}
          ${findAndClickIdOrClassNameCapybaraExamples}
          ${capybaraExamplesData(element).name && capybaraContainerExamples(element, `fill_in("${capybaraExamplesData(element).name}", with: "${capybaraExamplesData(element).value}")`)}
          ${capybaraExamplesData(element).placeholder && capybaraContainerExamples(element, `fill_in("${capybaraExamplesData(element).placeholder}", with: "${capybaraExamplesData(element).value}")`)}
        `
      }
    case 'SELECT':
      return `
        ${capybaraExamplesData(element).placeholder && `select("Option", from: "${capybaraExamplesData(element).placeholder}")`}
        ${findAndClickIdOrClassNameCapybaraExamples}
        ${capybaraExamplesData(element).placeholder && capybaraContainerExamples(element, `select("Option", from: "${capybaraExamplesData(element).placeholder}")`)}
      `
    default:
      return `
        ${capybaraExamplesData(element).content && `find("${capybaraExamplesData(element).content}").click`}
        ${capybaraExamplesData(element).content && capybaraExamplesData(element).class && `find("${capybaraExamplesData(element).class}", text: "${capybaraExamplesData(element).content}").click`}
        ${findAndClickIdOrClassNameCapybaraExamples}
        ${capybaraExamplesData(element).content && capybaraContainerExamples(element, `find("${capybaraExamplesData(element).content}").click`)}
        ${capybaraExamplesData(element).id && capybaraContainerExamples(element, `find("${capybaraExamplesData(element).id}").click`)}
        ${capybaraExamplesData(element).class && capybaraContainerExamples(element, `find("${capybaraExamplesData(element).class}").click`)}
      `
  }
}

export const copyToClipboardCapybaraExamples = (element: HTMLElement) => {
  copyToClipboard(capybaraExamples(element))
}
