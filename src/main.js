import TripMainInfo from './view/trip-main-info-view';
import TripFiltersView from './view/trip-filters-view';
import { render } from './render';
import BoardPresenter from './presenter/board-presenter';

const siteMainElement = document.querySelector('.page-body');
const siteTripMainInfoElement = siteMainElement.querySelector('.trip-main');
const siteFiltersElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter();


render(new TripMainInfo(), siteTripMainInfoElement, 'afterbegin');
render(new TripFiltersView(), siteFiltersElement);

boardPresenter.init(siteSortElement);


