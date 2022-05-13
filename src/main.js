import TripMainInfoView from './view/trip-main-info-view';
import TripFiltersView from './view/trip-filters-view';
// import { render } from './render';
import { render } from './framework/render';
import BoardPresenter from './presenter/board-presenter';
import { points } from './model/points-model';


const siteMainElement = document.querySelector('.page-body');
const siteTripMainInfoElement = siteMainElement.querySelector('.trip-main');
const siteFiltersElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');


const createTripInfoData = (items) => {

  const destinationsNames = new Set();
  let totalPrice = 0;
  let startDateInSeconds = new Date(items[0].dateFrom).getTime();
  let endDateInSeconds = 0;

  items.forEach((point) => {
    totalPrice += point.basePrice;

    if (point.additionalOffer.offers.length) {
      totalPrice += point.additionalOffer.offers
        .filter((offer) => offer.isChecked)
        .reduce((totalOfferPrice, offer) => totalOfferPrice + offer.price, 0);
    }

    destinationsNames.add(point.destination.name);

    startDateInSeconds = Math.min(
      startDateInSeconds,
      new Date(point.dateFrom).getTime()
    );

    endDateInSeconds = Math.max(
      endDateInSeconds,
      new Date(point.dateTo).getTime()
    );
  });

  const route = [...destinationsNames].join(' — ');
  const startDate = new Date(startDateInSeconds);
  const endDate = new Date(endDateInSeconds);

  return {
    route,
    totalPrice,
    startDate,
    endDate,
  };
};

const boardPresenter = new BoardPresenter();


render(new TripMainInfoView(createTripInfoData(points)), siteTripMainInfoElement, 'afterbegin');
render(new TripFiltersView(), siteFiltersElement);

boardPresenter.init(siteSortElement, points);


