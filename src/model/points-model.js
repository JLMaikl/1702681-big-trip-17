import { generatePoint, DESTINATION_COUNT } from '../mock/task';


const POINTS_COUNT = 3;

export const points = [...Array(POINTS_COUNT)].map((it, index) => {
  const destinationId = index % DESTINATION_COUNT;
  return generatePoint(index + 1, destinationId);
});

