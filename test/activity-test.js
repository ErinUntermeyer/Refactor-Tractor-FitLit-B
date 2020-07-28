import { expect } from 'chai';

import User from '../src/User';
import Hydration from '../src/Hydration';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';

describe('Activity', function() {
  let activity, badActivity, user;

  beforeEach(function() {
    activity = new Activity({userID: 1, date: 'today', numSteps: 8013, minutesActive: 40, flightsOfStairs: 2});
    badActivity = new Activity({userID: 'lazy', date: 20200722, numSteps: 'zero', minutesActive: 'none', flightsOfStairs: 'nada'});
    user = new User({
      id: 1,
      name: 'Alex Roth',
      address: '1234 Turing Street, Denver CO 80301-1697',
      email: 'alex.roth1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    },
    [new Hydration({userID: 1, date: 'today', numOunces: 2})],
    [new Sleep({userID: 1, date: 'today', hoursSlept: 3, sleepQuality: 0})],
    [new Activity({userID: 1, date: 'today', numSteps: 8013, minutesActive: 40, flightsOfStairs: 2})]
    );
  });

  it.only('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it.only('should be an instance of Activity', function() {
    expect(activity).to.be.an.instanceof(Activity);
  });

  it.only('should take in activity data', function() {
    expect(activity.userID).to.equal(1);
    expect(activity.date).to.equal('today');
    expect(activity.numSteps).to.equal(8013);
    expect(activity.minutesActive).to.equal(40);
    expect(activity.flightsOfStairs).to.equal(2);
  });

  it.only('should only take in valid data', function() {
    expect(badActivity.userID).to.equal(0);
    expect(badActivity.date).to.equal('Invalid value given');
    expect(badActivity.numSteps).to.equal(0);
    expect(badActivity.minutesActive).to.equal(0);
    expect(badActivity.flightsOfStairs).to.equal(0);
  });

  it.only('should calculate how many miles a user has walked that day', function() {
    expect(activity.calculateMilesWalked(user)).to.equal(6.53);
  });

  it.only('should indicate if the user has reached their step goal', function() {
    expect(activity.checkStepGoal(user)).to.equal(false);
  });

  it.only('methods should only take in a user instance', function() {
    expect(activity.calculateMilesWalked("not a user")).to.equal(null);
    expect(activity.checkStepGoal("not a user")).to.equal(null);
  });
});
