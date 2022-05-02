import TripMainInfoView from './view/trip-main-info-view';
import TripFiltersView from './view/trip-filters-view';
import { render } from './render';
import BoardPresenter from './presenter/board-presenter';
import TaskModel from './model/tasks-model';

const siteMainElement = document.querySelector('.page-body');
const siteTripMainInfoElement = siteMainElement.querySelector('.trip-main');
const siteFiltersElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');

const tasksModel = new TaskModel();
const boardPresenter = new BoardPresenter();


render(new TripMainInfoView(tasksModel), siteTripMainInfoElement, 'afterbegin');
render(new TripFiltersView(), siteFiltersElement);

boardPresenter.init(siteSortElement, tasksModel);


