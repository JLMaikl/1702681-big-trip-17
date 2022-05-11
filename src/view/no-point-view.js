import { createElement } from '../render';

const createNoEventsTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';


export default class NoPointView {
  constructor(filterName) {
    this.filterName = filterName;
  }

  getTemplate() {
    return createNoEventsTemplate(this.filterName);
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

}
