const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Data from '../src/Data';
import Sleep from '../src/Sleep';
import Hydration from '../src/Hydration';
import Activity from '../src/Activity';
import User from '../src/User';
import DOMupdates from '../src/DOMupdates';

describe('DOMupdates', function() {
	let DOMupdates1, user;

	beforeEach(function() {
		DOMupdates1 = new DOMupdates();
		user = new User({
			id: 1,
			name: 'Alex Roth',
			address: '1234 Turing Street, Denver CO 80301-1697',
			email: 'alex.roth1@hotmail.com',
			strideLength: 4.3,
			dailyStepGoal: 10000,
			friends: [2, 3, 4]
		},
		[new Hydration({ userID: 1, date: 'today', numOunces: 2 })],
		[new Sleep({ userID: 1, date: 'today', hoursSlept: 4, sleepQuality: 1 }), new Sleep({ userID: 1, date: 'yesterday', hoursSlept: 3, sleepQuality: 3 })],
		[new Activity({ userID: 1, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2 }), new Activity({ userID: 1, date: 'today', numSteps: 26, minutesActive: 40, flightsOfStairs: 2 })]);
		global.document = {};
		chai.spy.on(document, ['querySelector'], function() {
			return {};
		});
		chai.spy.on(DOMupdates, ['displayHydrationToday'], function () {
			return {};
		});
	});

	afterEach(function() {
		chai.spy.restore();
	});
	
	it.only('should display hydration data for today', function() {
		DOMupdates1.displayHydrationToday(user.hydrationInfo, 'today')
		expect(document.querySelector).to.have.been.called(1);
		expect(document.querySelector).to.have.been.called.with('#hydration-today');
	});

	it.only('should display hydration data for current week', function () {
		DOMupdates1.displayHydrationWeek(user.hydrationInfo, 'today')
		expect(document.querySelector).to.have.been.called(1);
		expect(document.querySelector).to.have.been.called.with('#hydration-this-week');
	});

});