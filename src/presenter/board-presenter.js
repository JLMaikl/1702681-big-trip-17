import TripEventsItemView from '../view/trip-events-item-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripSortView from '../view/trip-sort-view';
import AddNewPointView from '../view/add-new-point-view';
import { render } from '../render.js';

export default class BoardPresenter {
  tripSortViewComponent = new TripSortView();
  tripEventsListComponent = new TripEventsListView();

  init = (boardContainer, points) => {
    this.boardContainer = boardContainer;
    this.points = points;

    render(this.tripSortViewComponent, this.boardContainer);
    render(this.tripEventsListComponent, this.boardContainer);


    points.map((point) => {
      this.#renderNewPoint(point);
    }

    );
  };

  #renderNewPoint = (point) => {
    const newPointComponent = new AddNewPointView(point);
    const pointComponent = new TripEventsItemView(point);

    const replacePointToForm = () => {
      this.tripEventsListComponent.getElement().replaceChild(newPointComponent.getElement(), pointComponent.getElement());
    };

    const replaceFormToPoint = () => {
      this.tripEventsListComponent.getElement().replaceChild(pointComponent.getElement(), newPointComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };


    newPointComponent.getElement().querySelector('form').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(newPointComponent, this.tripEventsListComponent.getElement());
  };
}
