import { render } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view';
import TripSortView from '../view/trip-sort-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter.js';


export default class BoardPresenter {
  #tripSortViewComponent = new TripSortView();
  #tripEventsListComponent = new TripEventsListView();

  #renderSortView = () => {
    render(this.#tripSortViewComponent, this.boardContainer);
  };

  #renderEventsList = () => {
    render(this.#tripEventsListComponent, this.boardContainer);
  };

  #renderNoPointView = () => {
    render(new NoPointView(), this.#tripEventsListComponent.element);
  };

  init = (boardContainer, points) => {
    this.boardContainer = boardContainer;
    this.points = points;

    this.#renderSortView();
    this.#renderEventsList();

    if (!points.length) {
      this.#renderNoPointView();
    } else {
      points.map((point) => {
        this.#renderNewPoint(point);
      });
    }
  };

  #renderNewPoint = (point) => {

    if (!point) {
      this.#renderNoPointView();
    } else {
      const pointPresenter = new PointPresenter(this.#tripEventsListComponent.element);
      pointPresenter.init(point);
    }

  };
}
