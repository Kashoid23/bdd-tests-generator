import { elementClassName } from "./capybara/elementClassName";
import { elementId } from "./capybara/elemenId";

export interface ElementData {
  tag: string;
  id: string | null;
  class: string | null;
  name: string | null;
  content: string | undefined;
  placeholder: string | null;
  value: string | null;
  type: string | null;
  closestParent: { id: string | null; class: string | null; };
}

export function elementData(element: HTMLElement): ElementData {
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
    closestParent: {
      id: elementId(element.closest('div[id]')),
      class: elementClassName(element.closest('div[class]'))
    },
  }) : (
    {
      tag: '',
      id: '',
      class: '',
      name: '',
      content: '',
      placeholder: '',
      value: '',
      type: '',
      closestParent: {
        id: '',
        class: ''
      }
    }
  )
}
