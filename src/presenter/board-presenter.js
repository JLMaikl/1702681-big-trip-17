import TripEventsItemView from '../view/trip-events-item-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripSortView from '../view/trip-sort-view';
import AddNewPointView from '../view/add-new-point-view';
import {render} from '../render.js';

export default class BoardPresenter {
  tripSortViewComponent = new TripSortView();
  tripEventsListComponent = new TripEventsListView();


  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.tripSortViewComponent, this.boardContainer);
    render(this.tripEventsListComponent, this.boardContainer);
    render(new AddNewPointView(), this.tripEventsListComponent.getElement());


    for (let i = 0; i < 3; i++) {
      render(new TripEventsItemView(), this.tripEventsListComponent.getElement());
    }
  };
}
