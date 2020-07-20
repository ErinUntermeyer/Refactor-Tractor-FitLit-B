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
		}),
		user2 = new User({
			id: 2,
			name: 'Allie McCarthy',
			address: '1235 Turing Street, Denver CO 80301-1697',
			email: 'allie.mcc1@hotmail.com',
			strideLength: 3.3,
			dailyStepGoal: 9000,
			friends: [1, 3, 4]
		}),
		user3 = new User({
			id: 3,
			name: 'The Rock',
			address: '1236 Awesome Street, Denver CO 80301-1697',
			email: 'therock@hotmail.com',
			strideLength: 10,
			dailyStepGoal: 60000,
			friends: [1, 2, 4]
		}),
		user4 = new User({
			id: 4,
			name: 'Rainbow Dash',
			address: '1237 Equestria Street, Denver CO 80301-1697',
			email: 'rainbowD1@hotmail.com',
			strideLength: 3.8,
			dailyStepGoal: 7000,
			friends: [1, 2, 3]
		}),
		badUser = new User({
			id: 'one',
			name: ['Bad User'],
			address: {address: '1234 Turing Street, Denver CO 80301-1697'},
			email: {email: 'baduser@hotmail.com'},
			strideLength: '4.3',
			dailyStepGoal: 'a lot',
			friends: 2
		});
	});

  it.skip('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it.skip('should be an instance of User', function() {
    expect(user1).to.be.an.instanceof(User);
  });

  it.skip('should take info from user data', function() {
    expect(user1.id).to.equal(1);
		expect(user1.name).to.equal('Alex Roth');
		expect(user1.address).to.equal('1234 Turing Street, Denver CO 80301-1697');
		expect(user1.email).to.equal('alex.roth1@hotmail.com');
		expect(user1.strideLength).to.equal(4.3);
		expect(user1.dailyStepGoal).to.equal(10000);
		expect(user1.friends).to.deep.equal([2, 3, 4]);
	});

	it.skip('should only take a number for id, strideLength and dailyStepGoal', function() {
		expect(badUser.id).to.equal(null);
		expect(badUser.strideLength).to.equal(null);
		expect(badUser.dailyStepGoal).to.equal(null);
	});

	it.skip('should only take a string for name, address and email', function () {
		expect(badUser.name).to.equal(null);
		expect(badUser.address).to.equal(null);
		expect(badUser.email).to.equal(null);
	});

	it.skip('should only take an array for friends', function () {
		expect(badUser.friends).to.equal(null);
	});
	
  it.skip('should return user first name', function() {
    expect(user2.getFirstName()).to.equal('Allie');
  });

  it.only('should return list of friend names from user repository', function() {
    const users = [user1, user2, user3, user4];
    const userRepo = new UserRepo(users);

    expect(user2.getFriendsNames(userRepo)).to.deep.equal(['Alex Roth', 'The Rock', 'Rainbow Dash']);
  });
});
