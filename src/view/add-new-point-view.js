import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import { generateDestination, DESTINATIONS_NAMES,} from '../mock/destination.js';
import { generateOffer } from '../mock/offer.js';


const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const  createAddNewPointTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, id, additionalOffer, type, } = point;

  let offersMarkup = '';
  let imagesMarkup = '';
  let destinationMarkup = '';

  const eventTypeItemsMarkup = TYPES.map(
    (eventType) =>
      `<div class="event__type-item">
      <input id="event-type-${eventType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${id}">${eventType[0].toUpperCase() + eventType.slice(1)}</label>
    </div>`
  ).join('');

  const destinationOptionsMarkup = DESTINATIONS_NAMES.map(
    (name) => `<option value="${name}"></option>`
  ).join('');

  if (additionalOffer.offers.length) {
    offersMarkup = additionalOffer.offers
      .map(
        (offer) =>
          `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" data-id="${offer.id}" id="event-offer-${offer.mod}-${id}"type="checkbox" name="event-offer-${offer.mod}"${offer.isChecked ? ' checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.mod}-${id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
      )
      .join('');

    offersMarkup = `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>`;
  }

  if (destination.description) {
    if (destination.pictures.length) {
      imagesMarkup = destination.pictures
        .map(
          (picture) =>
            `<img class="event__photo" src="${picture.src}" alt="Event photo">`
        )
        .join('');

      imagesMarkup = `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${imagesMarkup}
        </div>
      </div>`;
    }

    destinationMarkup = `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${imagesMarkup}
    </section>`;
  }

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeItemsMarkup}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type[0].toUpperCase() + type.slice(1)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            ${destinationOptionsMarkup}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" data-type="dateFrom" id="event-start-time-${id}" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" data-type="dateTo" id="event-end-time-${id}" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offersMarkup}
        ${destinationMarkup}
      </section>
    </form>
  </li>`;
};

export default class AddNewPointView extends AbstractStatefulView {

  constructor(point) {
    super();
    this._state = AddNewPointView.parseDataToState(point);

    this.#setInnerHandlers();
  }

  get template() {
    return createAddNewPointTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(AddNewPointView.parseStateToData(this._state));
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector('.event__save-btn')
      .addEventListener('click', this._callback.click);
  };

  setOnEditClick = (callback) => {
    this._callback.editClick = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onEditClick);
  };

  #onEditClick = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('form')
      .addEventListener('change', this.#onFormChange);
  };

  #onFormChange = (evt) => {
    const eventTypeInput = evt.target.closest('input[name="event-type"]');
    const eventDestinationInput = evt.target.closest('input[name="event-destination"]');
    const eventOfferCheckbox = evt.target.closest('.event__offer-checkbox');

    if (eventTypeInput) {
      const newEventType = eventTypeInput.value;

      this.updateState({
        type: newEventType,
        additionalOffer: generateOffer(newEventType),
      });
    }

    if (eventDestinationInput) {
      this.updateState({
        destination: {
          ...generateDestination(0),
          name: eventDestinationInput.value,
        },
      });
    }

    if (eventOfferCheckbox) {
      const eventOfferCheckboxId = parseInt(eventOfferCheckbox.dataset.id, 10);
      const newOffers = this._state.additionalOffer.offers.slice();

      const offer = newOffers.find((item) => item.id === eventOfferCheckboxId);
      offer.isChecked = !offer.isChecked;

      this.updateState(
        {
          additionalOffer: {
            ...this._state.additionalOffer,
            offers: newOffers,
          },
        },
        true
      );
    }
  };

  static parseDataToState = (data) => ({ ...data });

  static parseStateToData = (state) => {
    const data = { ...state };
    return data;
  };
}
