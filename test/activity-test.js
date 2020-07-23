import { expect } from 'chai';

import Activity from '../src/Activity';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Activity', function() {

  let activity, badActivity;

  beforeEach(function() {
    activity = new Activity({userID: 1, date: '2020/07/22', numSteps: 1002, minutesActive: 113, flightsOfStairs: 13});
    badActivity = new Activity({userID: 'lazy', date: 20200722, numSteps: 'zero', minutesActive: 'none', flightsOfStairs: 'nada'});
  })

  it.only('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it.only('should be an instance of Activity', function() {
    expect(activity).to.be.an.instanceof(Activity);
  });

  it.only('should take in activity data', function() {
    expect(activity.userID).to.equal(1);
    expect(activity.date).to.equal('2020/07/22');
    expect(activity.numSteps).to.equal(1002);
    expect(activity.minutesActive).to.equal(113);
    expect(activity.flightsOfStairs).to.equal(13);
  });

  it.only('should only take in valid data', function() {
    expect(badActivity.userID).to.equal(null);
    expect(badActivity.date).to.equal(null);
    expect(badActivity.numSteps).to.equal(null);
    expect(badActivity.minutesActive).to.equal(null);
    expect(badActivity.flightsOfStairs).to.equal(null);
  });
});
