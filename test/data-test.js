import { expect } from 'chai';

import Data from '../src/Data';

describe('Data', function() {
  let data, badData;

  beforeEach(function() {
    data = new Data();
  })

  it.only('should be a function', function() {
    expect(Data).to.be.a('function');
  });

  it.only('should be an instance of Data', function() {
    expect(data).to.be.an.instanceof(Data);
  });
})
