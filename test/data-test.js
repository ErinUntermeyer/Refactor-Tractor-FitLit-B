import { expect } from 'chai';

import Data from '../src/Data';

describe('Data', function() {

  it.only('should be a function', function() {
    expect(Data).to.be.a('function');
  });

  it.skip('should be an instance of Data', function() {
    expect(data).to.be.an.instanceof(Data);
  });
})
