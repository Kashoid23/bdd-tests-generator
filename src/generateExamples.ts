import { capybaraExamples, capybaraVisitExample } from "./capybara/capybaraExamples";
import { capybaraExpectExamples } from './capybara/capybaraExpectExamples'
import { sanitizeExamples } from "./sanitizeExamples";
import { elementData } from "./elementData";

export const generateVisitExample = (href: string) => {
  const visitExample = capybaraVisitExample(href)

  return visitExample
}

export const generateExamples = (element: HTMLElement) => {
  const examples = capybaraExamples(elementData(element))

  return sanitizeExamples(examples)
}

export const generateExpectExamples = (element: HTMLElement) => {
  const expectExamples = capybaraExpectExamples(elementData(element))

  return sanitizeExamples(expectExamples)
}
