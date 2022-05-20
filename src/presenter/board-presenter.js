import { render } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view';
import TripSortView from '../view/trip-sort-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';


export default class BoardPresenter {
  #tripSortViewComponent = new TripSortView();
  #tripEventsListComponent = new TripEventsListView();

  #points = [];

  #pointPresenter = new Map();

  #renderSortView = () => {
    render(this.#tripSortViewComponent, this.boardContainer);
  };

  #renderEventsList = () => {
    render(this.#tripEventsListComponent, this.boardContainer);
  };

  #renderNoPointView = () => {
    render(new NoPointView(), this.#tripEventsListComponent.element);
  };

  #onPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #clearEventsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
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
      const pointPresenter = new PointPresenter(this.#tripEventsListComponent.element, this.#onPointChange, this.#handleModeChange);
      pointPresenter.init(point);
      this.#pointPresenter.set(point.id, pointPresenter);
    }
  };
}
