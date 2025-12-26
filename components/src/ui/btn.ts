import { createElement } from "../lib/create-elem.ts";

interface IBtnParams {
  text: string;
  classes?: string[];
  parent?: HTMLElement;
  onClick: (event: MouseEvent) => void;
}

export function btn(params: IBtnParams): HTMLElement {
  const { text, parent, classes = [], onClick } = params;
  const elem: HTMLElement = createElement({
    text: text,
    tag: "div",
    parent: parent,
    classes: classes,
  });
  elem.addEventListener("click", onClick);
  return elem;
}
