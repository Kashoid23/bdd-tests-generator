import { elementClassName } from "./capybara/elementClassName";
import {elementId} from "./capybara/elemenId";

export interface ElementData {
  tag: string;
  id: string | null;
  class: string | null;
  name: string | null;
  content: string | undefined;
  placeholder: string | null;
  value: string | null;
  type: string | null;
  target?: HTMLElement;
}

export function elementData(element: HTMLElement): ElementData {
  console.log()
  return element ? ({
    tag: element.tagName,
    id: elementId(element),
    class: elementClassName(element),
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
