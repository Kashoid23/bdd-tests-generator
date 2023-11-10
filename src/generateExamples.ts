import { capybaraExpectExamples } from './capybara/capybaraExpectExamples'
import { sanitizeExamples } from "./sanitizeExamples";
import { elementData } from "./elementData";

export const generateExpectExamples = (element: HTMLElement) => {
  const expectExamples = capybaraExpectExamples(elementData(element))

  return sanitizeExamples(expectExamples)
}
