import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('User Repo', function() {
  let user1, user2, users, userRepo, userRepo1;

  beforeEach(function() {
	user1 = new User({
		id: 1,
		name: 'Alex Roth',
		address: '1234 Turing Street, Denver CO 80301-1697',
		email: 'alex.roth1@hotmail.com',
		strideLength: 4.3,
		dailyStepGoal: 10000,
		friends: [2, 3, 4]
	},
	[{ userID: 1, date: 'today', numOunces: 2 }],
	[{ userID: 1, date: 'today', hoursSlept: 3, sleepQuality: 4 }],
	[{ userId: 1, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2 }]);
	user2 = new User({
		id: 2,
		name: 'Allie McCarthy',
		address: '1235 Turing Street, Denver CO 80301-1697',
		email: 'allie.mcc1@hotmail.com',
		strideLength: 3.3,
		dailyStepGoal: 9000,
		friends: [1, 3, 4]
	},
	[{ userID: 2, date: 'today', numOunces: 2 }],
	[{ userID: 2, date: 'today', hoursSlept: 3, sleepQuality: 0 }],
	[{ userId: 2, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2 }]);
	users = [user1, user2];
	userRepo = new UserRepo(users);
	userRepo1 = new UserRepo();
  });

  it.only('should be a function', function() {
    expect(UserRepo).to.be.a('function');
  });

  it.only('should only take in an array of instances of User', function() {
    expect(userRepo1.users).to.equal(null);
  });

  it.only('should return user data when given user ID', function() {
    expect(userRepo.getDataFromID(1)).to.equal(user1);
	});

	it.only('should return null if user ID does not exist', function() {
		expect(userRepo.getDataFromID(3)).to.equal(null);
	});

  it.only('should return the average of all users step goals', function() {
    expect(userRepo.calculateAverageStepGoal()).to.equal(9500);
	});

	it.only('should return 0 if users is null', function() {
		expect(userRepo1.calculateAverageStepGoal()).to.equal(0);
	});

  it.only('should return a list of users with sleep quality greater than three', function() {
		expect(userRepo.findSleepQualityGreaterThanThree('today')).to.deep.equal([user1]);
	});

  it.only('should return the user that has slept the most hours', function() {
		expect(userRepo.findMostHoursSlept('today')).to.deep.equal(users);
	});
 });
