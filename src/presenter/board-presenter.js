import TripEventsItemView from '../view/trip-events-item-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripSortView from '../view/trip-sort-view';
import AddNewPointView from '../view/add-new-point-view';
import {render} from '../render.js';

export default class BoardPresenter {
  tripSortViewComponent = new TripSortView();
  tripEventsListComponent = new TripEventsListView();


  init = (boardContainer, points) => {
    this.boardContainer = boardContainer;
    this.points = points;


    render(this.tripSortViewComponent, this.boardContainer);
    render(this.tripEventsListComponent, this.boardContainer);
    render(new AddNewPointView(), this.tripEventsListComponent.getElement());

    points.map((point) => render(new TripEventsItemView(point),
      this.tripEventsListComponent.getElement()
    ));
  };
}
