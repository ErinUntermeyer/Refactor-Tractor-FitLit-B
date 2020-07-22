import { expect } from 'chai';

import Data from '../src/Data';

describe('Data', function() {
  let data, badData;

  beforeEach(function() {
    data = new Data(1, "07/22/2020");
    badData = new Data("I dont believe in numbers", true)
  })

  it.only('should be a function', function() {
    expect(Data).to.be.a('function');
  });

  it.only('should be an instance of Data', function() {
    expect(data).to.be.an.instanceof(Data);
  });

  it.only('should have a userID', function() {
    expect(data.userID).to.equal(1);
  });

  it.only('should have a date', function() {
    expect(data.date).to.equal("07/22/2020");
  });

  it.only('should only accept a number for userID', function() {
    expect(badData.userID).to.equal(null);
  });

  it.only('should only accept a string for date', function() {
    expect(badData.date).to.equal(null);
  });
})
