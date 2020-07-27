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

  it.only('should take in sleep data', function() {
    expect(sleep.userID).to.equal(1);
    expect(sleep.date).to.equal('2020/07/24');
    expect(sleep.hoursSlept).to.equal(8.2);
    expect(sleep.sleepQuality).to.equal(2.8);
  });

  it.only('should only take in valid data', function() {
    expect(badSleep.userID).to.equal(0);
    expect(badSleep.date).to.equal('Invalid value given');
    expect(badSleep.hoursSlept).to.equal(0);
    expect(badSleep.sleepQuality).to.equal(0);
  });
});
