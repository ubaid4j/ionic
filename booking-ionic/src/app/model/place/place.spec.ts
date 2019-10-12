import { Place } from './place';

describe('Place', () => {
  it('should create an instance', () => {
    expect(new Place(null, null, null, null, null)).toBeTruthy();
  });
});
