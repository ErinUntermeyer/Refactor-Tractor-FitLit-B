import { expect } from 'chai';

import Sleep from '../src/Sleep';

describe('Sleep', function() {
  let sleep, badSleep;

  beforeEach(function() {
    sleep = new Sleep({userID: 1, date: '2020/07/24', hoursSlept: 8.2, sleepQuality: 2.8});
    badSleep = new Sleep({userID: 'I am tired', date: 20200724, hoursSlept: 'zero', sleepQuality: 'nope'});
  });

  it.only('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });

  it.only('should be an instance of Hydration', function() {
    expect(sleep).to.be.an.instanceof(Sleep);
  });

  it.only('should only take in valid data', function() {
    expect(badSleep.userID).to.equal(null);
    expect(badSleep.date).to.equal(null);
    expect(badSleep.hoursSlept).to.equal(null);
    expect(badSleep.sleepQuality).to.equal(null);
  });
});
