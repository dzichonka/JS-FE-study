// export const createElement = (tag, props, ...children) => {
//   const element = document.createElement(tag);

//   Object.keys(props).forEach((key) => element.setAttribute(key, props[key]));

//   children.forEach((child) => {
//     if (typeof child === "string") {
//       element.appendChild(document.createTextNode(child));
//     } else {
//       element.appendChild(child);
//     }
//   });

//   return element;
// };
interface CreateElem {
  tag: keyof HTMLElementTagNameMap;
  text?: string;
  children?: (HTMLElement | keyof HTMLElementTagNameMap | string)[];
  parent?: HTMLElement | keyof HTMLElementTagNameMap | null;
  classes?: string[];
  id?: string;
  attributes?: Record<string, string>;
  style?: string;
}

export function createElement<T extends keyof HTMLElementTagNameMap>(
  options: CreateElem & { tag: T }
): HTMLElementTagNameMap[T] {
  const {
    tag,
    text = "",
    children,
    parent,
    classes = [],
    id,
    attributes,
    style,
  } = options;

  let element = <HTMLElementTagNameMap[T]>document.createElement(tag);
  element = document.createElement(tag);
  element.textContent = text;

  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        element.append(document.createTextNode(child));
      } else {
        element.append(child);
      }
    });
  }

  if (parent) {
    if (typeof parent === "string") {
      const parentElement = document.querySelector(parent);
      if (parentElement instanceof HTMLElement) {
        parentElement.append(element);
      } else {
        console.error(`Parent selector "${parent}" did not match any element.`);
      }
    } else if (parent instanceof HTMLElement) {
      parent.append(element);
    } else {
      console.error("Parent is not a valid HTML element:", parent);
    }
  }

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (id) {
    element.id = id;
  }

  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (key in element) {
        (element as any)[key] = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }

  if (style) {
    element.style.cssText = style;
  }

  return element;
}
