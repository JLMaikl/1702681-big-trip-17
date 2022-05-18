import {render, replace} from '../framework/render.js';
import AddNewPointView from '../view/add-new-point-view';
import TripEventsItemView from '../view/trip-events-item-view';

export default class PointPresenter {
  #newPointComponent = null;
  #pointComponent = null;
  #taskListContainer = null;

  #point = null;

  constructor(taskListContainer) {
    this.#taskListContainer = taskListContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#newPointComponent = new AddNewPointView(point);
    this.#pointComponent = new TripEventsItemView(point);

    this.#newPointComponent.setClickHandler(this.#handleFormToPoint);
    this.#newPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointComponent.setEditClickHandler(this.#hadlePointToForm);

    render(this.#pointComponent, this.#taskListContainer);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  //FormToPoint

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#newPointComponent);
  };

  #replaceFormToPointClick = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFormToPoint = () => {
    this.#replaceFormToPointClick();
  };

  #replaceToFormSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFormSubmit = () => {
    this.#replaceToFormSubmit();
  };

  // PointToForm

  #replacePointToForm = () => {
    replace(this.#newPointComponent, this.#pointComponent);
  };

  #replacePointToFormClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #hadlePointToForm = () => {
    this.#replacePointToFormClick();
  };

}
