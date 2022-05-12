import { createElement } from '../render';

const createNoEventsTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';


export default class NoPointView {
  #filterName = null;
  #element = null;

  constructor(filterName) {
    this.#filterName = filterName;
  }

  get template() {
    return createNoEventsTemplate(this.#filterName);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

}
