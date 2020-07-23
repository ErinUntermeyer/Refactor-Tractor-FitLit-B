import { expect } from 'chai';
import Hydration from '../src/Hydration';

describe('Hydration', function() {

  it.only('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });

  it.only('should be an instance of Hydration', function() {
    let hydration = new Hydration({userID: 1, date: '2020/07/22', numOunces: 13});
    expect(hydration).to.be.an.instanceof(Hydration);
  });
});
