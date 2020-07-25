import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('User', function() {
	let user1, user2, user3, user4, badUser;

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
		[{userID: 1, date: 'today', numOunces: 2}],
		[{userID: 1, date: 'today', hoursSlept: 4, sleepQuality: 1}, {userID: 1, date: 'yesterday', hoursSlept: 3, sleepQuality: 3}],
		[{userID: 1, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2}, {userID: 1, date: 'today', numSteps: 26, minutesActive: 40, flightsOfStairs: 2}]);
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
		[{ userID: 2, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2 }, { userID: 2, date: 'tomorrow', numSteps: 9013, minutesActive: 40, flightsOfStairs: 2 }]);
		user3 = new User({
			id: 3,
			name: 'The Rock',
			address: '1236 Awesome Street, Denver CO 80301-1697',
			email: 'therock@hotmail.com',
			strideLength: 10,
			dailyStepGoal: 60000,
			friends: [1, 2, 4]
		},
		[{ userID: 3, date: 'today', numOunces: 2 }],
		[{ userID: 3, date: 'today', hoursSlept: 3, sleepQuality: 0 }],
		[{ userID: 3, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2 }]);
		user4 = new User({
			id: 4,
			name: 'Rainbow Dash',
			address: '1237 Equestria Street, Denver CO 80301-1697',
			email: 'rainbowD1@hotmail.com',
			strideLength: 3.8,
			dailyStepGoal: 7000,
			friends: [1, 2, 3]
		},
		[{ userID: 4, date: 'today', numOunces: 2 }],
		[{ userID: 4, date: 'today', hoursSlept: 3, sleepQuality: 0 }],
		[{ userID: 4, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2 }]);
		badUser = new User({
			id: 'one',
			name: ['Bad User'],
			address: {address: '1234 Turing Street, Denver CO 80301-1697'},
			email: {email: 'baduser@hotmail.com'},
			strideLength: '4.3',
			dailyStepGoal: 'a lot',
			friends: 'I have no friends'
		},
		[{ userID: 5, date: 'today', numOunces: 2 }],
		[{ userID: 5, date: 'today', hoursSlept: 3, sleepQuality: 0 }],
		[{ userID: 5, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2 }]);
	});

  it.only('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it.only('should be an instance of User', function() {
    expect(user1).to.be.an.instanceof(User);
  });

  it.only('should take info from user data', function() {
    expect(user1.id).to.equal(1);
		expect(user1.name).to.equal('Alex Roth');
		expect(user1.address).to.equal('1234 Turing Street, Denver CO 80301-1697');
		expect(user1.email).to.equal('alex.roth1@hotmail.com');
		expect(user1.strideLength).to.equal(4.3);
		expect(user1.dailyStepGoal).to.equal(10000);
		expect(user1.friends).to.deep.equal([2, 3, 4]);
	});

	it.only('should only take a number for id, strideLength and dailyStepGoal', function() {
		expect(badUser.id).to.equal(null);
		expect(badUser.strideLength).to.equal(null);
		expect(badUser.dailyStepGoal).to.equal(null);
	});

	it.only('should only take a string for name, address and email', function() {
		expect(badUser.name).to.equal(null);
		expect(badUser.address).to.equal(null);
		expect(badUser.email).to.equal(null);
	});

	it.only('should only take an array of friends', function () {
		expect(badUser.friends).to.equal(null);
	});

	it.only('should be able to take an empty array of friends', function() {
		badUser.friends = [];
		expect(badUser.friends).to.deep.equal([]);
	});

  it.only('should return user first name', function() {
    expect(user2.getFirstName()).to.equal('Allie');
	});

	it.only('should return null if user name doesnt exist', function() {
		expect(badUser.getFirstName()).to.equal(null);
	});

  it.only('should return list of friend names from user repository', function() {
    const users = [user1, user2, user3, user4];
    const userRepo = new UserRepo(users);
    expect(user2.getFriendsNames(userRepo)).to.deep.equal(['Alex Roth', 'The Rock', 'Rainbow Dash']);
	});

	it.only('should return null if user has no friends', function() {
		const users = [user1, user2, user3, user4];
		const userRepo = new UserRepo(users);
		expect(badUser.getFriendsNames(userRepo)).to.equal(null);
	});

  it.only('should find the record number of steps', function() {
		expect(user1.findRecordSteps()).to.deep.equal({userID: 1, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2});
	});

  it.only('should find the best night of sleep ever', function() {
		expect(user1.findBestNightOfSleepEver()).to.deep.equal({userID: 1, date: 'yesterday', hoursSlept: 3, sleepQuality: 3});
	});

  it.only('should find all days a step goal was reached', function() {
		expect(user2.findAllDaysStepGoalReached()).to.deep.equal(['tomorrow']);
	});
});
