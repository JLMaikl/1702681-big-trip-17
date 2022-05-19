import {remove, render, replace} from '../framework/render.js';
import AddNewPointView from '../view/add-new-point-view';
import TripEventsItemView from '../view/trip-events-item-view';

export default class PointPresenter {
  #editPointComponent = null;
  #pointComponent = null;
  #taskListContainer = null;

  #point = null;

  constructor(taskListContainer) {
    this.#taskListContainer = taskListContainer;
  }

  init = (point) => {
    this.#point = point;

    const prevEditPointComponent = this.#editPointComponent;
    const prevPointComponent = this.#pointComponent;

    this.#editPointComponent = new AddNewPointView(point);
    this.#pointComponent = new TripEventsItemView(point);

    this.#editPointComponent.setClickHandler(this.#handleFormToPoint);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointComponent.setEditClickHandler(this.#hadlePointToForm);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#taskListContainer);
      return;
    }

    if (this.#taskListContainer.contains(prevPointComponent.element )) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#taskListContainer.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
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
    replace(this.#pointComponent, this.#editPointComponent);
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
    replace(this.#editPointComponent, this.#pointComponent);
  };

  #replacePointToFormClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #hadlePointToForm = () => {
    this.#replacePointToFormClick();
  };

}
