import { createElement } from "../lib/create-elem.ts";
import { eventEmitter } from "../lib/event-emitter";
interface ICreateElem {
  tag: keyof HTMLElementTagNameMap;
  text?: string;
  children?: (HTMLElement | keyof HTMLElementTagNameMap | string)[];
  parent?: HTMLElement | keyof HTMLElementTagNameMap | null;
  classes?: string[];
  id?: string;
  attributes?: Record<string, string>;
  style?: string;
}

import "@/styles/style.scss";

interface IBtnAwesomeParams extends Pick<ICreateElem, "parent"> {}

export function btnASound(params: IBtnAwesomeParams): HTMLElement {
  const { parent } = params;
  const elem: HTMLElement = createElement({
    tag: "div",
    parent: parent,
    classes: ["btn", "btn_clickable", "btn-sound"],
  });
  elem.addEventListener("click", () => eventEmitter.emit("soundSwitch"));
  return elem;
}
