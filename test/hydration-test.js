import { expect } from 'chai';

import Hydration from '../src/Hydration';

describe('Hydration', function() {
  let hydration, badHydration;

  beforeEach(function() {
    hydration = new Hydration({userID: 1, date: '2020/07/22', numOunces: 13});
    badHydration = new Hydration({userID: 'dehydrated', date: 20200722, numOunces: 'dying of thirst'});
  })

  it.only('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });

  it.only('should be an instance of Hydration', function() {
    expect(hydration).to.be.an.instanceof(Hydration);
  });

  it.only('should take in hydration data', function() {
    expect(hydration.userID).to.equal(1);
    expect(hydration.date).to.equal('2020/07/22');
    expect(hydration.numOunces).to.equal(13);
  });

  it.only('should only take in valid data', function() {
    expect(badHydration.userID).to.equal(null);
    expect(badHydration.date).to.equal(null);
    expect(badHydration.numOunces).to.equal(null);
  });
});
