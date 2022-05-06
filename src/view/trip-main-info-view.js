import { createElement } from '../render';
import dayjs from 'dayjs';

const generateEventPeriod = (startDate, endDate) => {
  const isSameMonth = dayjs(startDate).get('month') === dayjs(endDate).get('month');
  const dayjsMonthParam = isSameMonth ? '' : 'MMM ';

  return `${dayjs(startDate).format('MMM DD')}&nbsp;—&nbsp;${dayjs(endDate).format(`${dayjsMonthParam}DD`)}`;
};


const createTripMainInfoTemplate = ( point ) => {
  const {route, totalPrice, startDate, endDate} = point;

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${generateEventPeriod(startDate, endDate)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>
  `);};

export default class TripMainInfoView {
  constructor(task) {
    this.task = task;
  }

  getTemplate() {
    return createTripMainInfoTemplate(this.task);
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
  // #event = null;

  // constructor(event = {}) {
  //   this.#event = event;
  // }

  // get template() {
  //   return createTripMainInfoTemplate(this.#event);
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
