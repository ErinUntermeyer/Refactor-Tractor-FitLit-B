import { expect } from 'chai';

import Hydration from '../src/Hydration';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Data from '../src/Data';

describe('Data', function() {
  let data, testHydrationData, testSleepData, testActivityData;

  beforeEach(function() {
    data = new Data();
    testHydrationData = [
      new Hydration({userID: 1, date: '2020/07/22', numOunces: 13}),
      new Hydration({userID: 1, date: '2020/07/23', numOunces: 14}),
      new Hydration({userID: 1, date: '2020/07/24', numOunces: 15})
    ];
    testSleepData = [
      new Sleep({userID: 1, date: '2020/07/22', hoursSlept: 6.6, sleepQuality: 3.9}),
      new Sleep({userID: 1, date: '2020/07/23', hoursSlept: 7.5, sleepQuality: 2.5}),
      new Sleep({userID: 1, date: '2020/07/24', hoursSlept: 8.2, sleepQuality: 2.8})
    ];
    testActivityData = [
      new Activity({userID: 1, date: '2020/07/22', numSteps: 1002, minutesActive: 113, flightsOfStairs: 13}),
      new Activity({userID: 1, date: '2020/07/23', numSteps: 1010, minutesActive: 120, flightsOfStairs: 19}),
      new Activity({userID: 1, date: '2020/07/24', numSteps: 1953, minutesActive: 175, flightsOfStairs: 11})
    ];
  });

  it.only('should be a function', function() {
    expect(Data).to.be.a('function');
  });

  it.only('should be an instance of Data', function() {
    expect(data).to.be.an.instanceof(Data);
  });

  it.only('should be able to validate data types', function() {
    let hydrationInfo = testHydrationData[1].numOunces;
    expect(data.checkDataType(hydrationInfo, 'number')).to.equal(hydrationInfo);
    expect(data.checkDataType(hydrationInfo, 'string')).to.equal('Invalid value given');
  });

  it('should be able to assign a default value of the correct type if none is given', function() {
    expect(data.giveDefaultValue('string')).to.equal('Invalid value given');
  })

  // it.only('should be able to validate a given data set', function() {
  //   expect(data.checkDataSet(testSleepData)).to.equal(true);
  // });

  it.only('should be able to calculate an average statistic for all time', function() {
    expect(data.calculateAverage(testHydrationData, 'numOunces')).to.equal(14);
  });

  it.only('should be able to retrieve data from any given day', function() {
    expect(data.retrieveDataByDay(testSleepData, '2020/07/22', 'hoursSlept' )).to.equal(6.6);
  });

  it.only('should be able to retrieve data from any given week', function() {
    expect(data.retrieveAttributesByWeek(testSleepData, 'hoursSlept', '2020/07/24')).to.deep.equal([8.2, 7.5, 6.6]);
  });

  it.only('should be able to retrieve average data from any given week', function() {
    expect(data.retrieveAverageDataByWeek(testSleepData, 'hoursSlept', '2020/07/24')).to.equal(7.43);
  });

  it.only('should be able to retrieve the highest value of an attribute', function() {
    expect(data.findHighestValue(testActivityData, 'minutesActive')).to.deep.equal({userID: 1, date: '2020/07/24', numSteps: 1953, minutesActive: 175, flightsOfStairs: 11});
  });
})
