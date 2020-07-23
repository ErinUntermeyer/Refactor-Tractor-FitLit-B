import { expect } from 'chai';

import Activity from '../src/Activity';
import UserRepo from '../src/User-repo';
import User from '../src/User';

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
		[{userID: 1, date: 'today', numOunces: 2}],
		[{userID: 1, date: 'today', hoursSlept: 3, sleepQuality: 0}],
		[{userID: 1, date: 'today', numSteps: 8013, minutesActive: 40, flightsOfStairs: 2}]
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
    expect(badActivity.userID).to.equal(null);
    expect(badActivity.date).to.equal(null);
    expect(badActivity.numSteps).to.equal(null);
    expect(badActivity.minutesActive).to.equal(null);
    expect(badActivity.flightsOfStairs).to.equal(null);
  });

  it.only('should calculate how many miles a user has walked that day', function() {
    expect(activity.calculateMilesWalked(user)).to.equal(6.53);
  });
});
