import { className } from "./capybara/className";

export interface ElementData {
  tag: string;
  id: string;
  class: string;
  name: string | null;
  content: string | undefined;
  placeholder: string | null;
  value: string | null;
  type: string | null;
  target?: HTMLElement;
}

export function elementData(element: HTMLElement): ElementData {
  return element ? ({
    tag: element.tagName ? element.tagName.toLowerCase() : '',
    id: element.id ? `#${element.id}` : '',
    class: className(element),
    name: element.getAttribute('name'),
    content: element.innerText?.trim(),
    placeholder: element.getAttribute('placeholder'),
    value: element.getAttribute('value'),
    // @ts-ignore
    type: element.type,
    target: element,
  }) : (
    { tag: '', id: '', class: '', name: '', content: '', placeholder: '', value: '', type: '' }
  )
}
