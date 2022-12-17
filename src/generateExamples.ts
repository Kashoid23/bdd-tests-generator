import { capybaraExamples, capybaraVisitExample } from "./capybara/capybaraExamples";
import { capybaraExpectExamples } from './capybara/capybaraExpectExamples'
import { sanitizeExamples } from "./sanitizeExamples";

export const generateVisitExample = (href: string) => {
  const visitExample = capybaraVisitExample(href)

  return visitExample
}

export const generateExamples = (element: HTMLElement) => {
  const examples = capybaraExamples(element)

  return sanitizeExamples(examples)
}

export const generateExpectExamples = (element: HTMLElement) => {
  const expectExamples = capybaraExpectExamples(element)

  return sanitizeExamples(expectExamples)
}
