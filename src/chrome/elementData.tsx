interface ElementDataResult {
  tag: string;
  id: string;
  class: string;
  name: string | null;
  content: string | undefined;
  placeholder: string | null;
  value: string | null;
}

export function elementData(element: HTMLElement): ElementDataResult {
  return element ? ({
    tag: element.tagName ? element.tagName.toLowerCase() : '',
    id: element.id ? `#${element.id}` : '',
    class: element.className.length > 1 ? `.${element.className.split(' ').join('.')}` : element.className,
    name: element.getAttribute('name'),
    content: element.innerText?.trim(),
    placeholder: element.getAttribute('placeholder'),
    value: element.getAttribute('value')
  }) : (
    { tag: '', id: '', class: '', name: '', content: '', placeholder: '', value: '' }
  )
}

interface ExpectElementDataResult {
  tag: string;
  id: string;
  class: string;
  content: string | undefined;
}

export function expectElementData(element: HTMLElement): ExpectElementDataResult {
  return {
    tag: element.tagName ? element.tagName.toLowerCase() : '',
    id: element.id ? `#${element.id}` : '',
    class: element.className.length > 1 ? `.${element.className.split(' ').join('.')}` : element.className,
    content: element.innerText?.trim(),
  }
}
