import { capybaraExamples } from "./capybaraExamples";
import { capybaraExpectExamples } from "./capybaraExpectExamples";

export const copyToClipboard = (text: string = '') => {
  // Create a textarea to insert text.
  let copyFrom = document.createElement("textarea");
  // Set the textarea content
  copyFrom.textContent = text;
  // Append the textarea to the body as a child.
  document.body.appendChild(copyFrom);
  // Select all the text
  copyFrom.select();
  // Execute command
  document.execCommand('copy');
  // De-select the text using blur()
  copyFrom.blur();
  // Remove the textarea field from the document.body
  document.body.removeChild(copyFrom);
}

export const copyToClipboardCapybaraExamples = (element: HTMLElement) => {
  copyToClipboard(capybaraExamples(element))
}

export const copyToClipboardCapybaraExpectExamples = (element: HTMLElement) => {
  copyToClipboard(capybaraExpectExamples(element))
}
