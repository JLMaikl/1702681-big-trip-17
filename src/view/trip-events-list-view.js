import { createElement } from '../render';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsListView {
  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
  // #element = null;

  // get template() {
  //   return createEventsListTemplate();
  // }

  // get element() {
  //   if (!this.element) {
  //     this.#element = createElement(this.template);
  //   }

  //   return this.#element;
  // }

  // removeElement() {
  //   this.#element = null;
  // }
}
