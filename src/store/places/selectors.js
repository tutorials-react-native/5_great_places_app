export const getPlaces = state => state.places.places;

export const getPlaceById = placeId => state =>
  state.places.places.find(place => place.id == placeId);
