import AbstractView from '../framework/view/abstract-view.js';
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

export default class TripMainInfoView extends AbstractView {
  #task = null;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return createTripMainInfoTemplate(this.#task);
  }
}
