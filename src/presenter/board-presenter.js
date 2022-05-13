import { render, replace } from '../framework/render.js';
import TripEventsItemView from '../view/trip-events-item-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripSortView from '../view/trip-sort-view';
import AddNewPointView from '../view/add-new-point-view';
import NoPointView from '../view/no-point-view';


export default class BoardPresenter {
  tripSortViewComponent = new TripSortView();
  tripEventsListComponent = new TripEventsListView();

  init = (boardContainer, points) => {
    this.boardContainer = boardContainer;
    this.points = points;

    render(this.tripSortViewComponent, this.boardContainer);
    render(this.tripEventsListComponent, this.boardContainer);

    if (!points.length) {
      render(new NoPointView(), this.tripEventsListComponent.element);
    } else {

      points.map((point) => {
        this.#renderNewPoint(point);
      });
    }
  };

  #renderNewPoint = (point) => {
    const newPointComponent = new AddNewPointView(point);
    const pointComponent = new TripEventsItemView(point);

    const replacePointToForm = () => {
      replace(newPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, newPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    newPointComponent.setClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    newPointComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });


    if (!point) {
      render(new NoPointView(), this.tripEventsListComponent.element);
    } else {      render(pointComponent, this.tripEventsListComponent.element);

    }
  };
}
