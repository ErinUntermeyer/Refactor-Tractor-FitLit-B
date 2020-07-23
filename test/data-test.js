import { expect } from 'chai';

import Data from '../src/Data';

describe('Data', function() {
  let data, testHydrationData, testSleepData, testActivityData;

  beforeEach(function() {
    data = new Data();
    testHydrationData = [
      {userID: 1, date: '2020/07/22', numOunces: 13},
      {userID: 1, date: '2020/07/23', numOunces: 14},
      {userID: 1, date: '2020/07/24', numOunces: 15}
    ];
    testSleepData = [
      {userID: 1, date: '2020/07/22', hoursSlept: 6.6, sleepQuality: 3.9},
      {userID: 1, date: '2020/07/23', hoursSlept: 7.5, sleepQuality: 2.5},
      {userID: 1, date: '2020/07/24', hoursSlept: 8.2, sleepQuality: 2.8}
    ];
    testActivityData = [
      {userID: 1, date: '2020/07/22', numSteps: 1002, minutesActive: 113, flightsOfStairs: 13},
      {userID: 1, date: '2020/07/23', numSteps: 1010, minutesActive: 120, flightsOfStairs: 19},
      {userID: 1, date: '2020/07/24', numSteps: 1953, minutesActive: 175, flightsOfStairs: 11}
    ];
  });

  it.only('should be a function', function() {
    expect(Data).to.be.a('function');
  });

  it.only('should be an instance of Data', function() {
    expect(data).to.be.an.instanceof(Data);
  });

  it.only('should be able to calculate an average statistic for all time', function() {
    expect(data.calculateAverage(testHydrationData, 'numOunces')).to.equal(14);
  });

  it.only('should be able to retrieve data from any given day', function() {
    expect(data.retrieveDataByDay(testSleepData, 'hoursSlept', '2020/07/22')).to.equal(6.6);
  });

  it.only('should be able to retrieve data from any given week', function() {
    expect(data.retrieveAttributesByWeek(testSleepData, 'hoursSlept', '2020/07/24')).to.deep.equal([8.2, 7.5, 6.6]);
  });

  it.only('should be able to retrieve average data from any given week', function() {
    expect(data.retrieveAverageDataByWeek(testSleepData, 'hoursSlept', '2020/07/24')).to.equal(7.43);
  });

  it.only('should be able to retrieve the highest value of an attribute', function() {
    expect(data.findHighestValue(testActivityData, 'minutesActive')).to.equal(175);
  });
})
