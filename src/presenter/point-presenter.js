import {remove, render, replace} from '../framework/render.js';
import AddNewPointView from '../view/add-new-point-view';
import TripEventsItemView from '../view/trip-events-item-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
}

export default class PointPresenter {
  #editPointComponent = null;
  #pointComponent = null;
  #taskListContainer = null;
  #changeData = null;
  #changeMode = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(taskListContainer, changeData, changeMode) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
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
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#taskListContainer);
      return;
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointComponent);
    }


    if (this.#mode === Mode.DEFAULT) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
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

  //обработчик для закрытия формы редактирования
  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
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

  // обработчик для отправки отредактированных данных
  #handleFormSubmit = (point) => {
    this.#replaceToFormSubmit();
    this.#changeData(point);
  };

  // обработчик для открытия формы редактирования
  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replacePointToFormClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #hadlePointToForm = () => {
    this.#replacePointToFormClick();
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
