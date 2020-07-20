import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('User Repo', function() {
  let user1, user2, users, userRepo;

  beforeEach(function() {
    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });
    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });
    users = [user1, user2];
    userRepo = new UserRepo(users);
  });

  it('should be a function', function() {
    expect(UserRepo).to.be.a('function');
  });

  it('takes an array of user data', function() {
    expect(userRepo.users).to.include(user2);
  });

  it('should have a parameter to take in user data', function() {
    const users = [user1];
    const userRepo = new UserRepo(users);

    expect(userRepo.users[0].id).to.equal(1);
  });

  it('should return user data when given user ID', function() {
    expect(userRepo.getDataFromID(1)).to.eql(user1);
  });

  it('should return the average of all users step goals', function() {
    expect(userRepo.calculateAverageStepGoal()).to.eql(9500);
  });
 });
