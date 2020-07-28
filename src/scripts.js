import './css/base.scss';
import './css/style.scss';

import './images/The Rock.jpg';

import User from './User';
import UserRepo from './User-repo';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';
import Data from './Data';
import DOMupdates from './DOMupdates';

const data = new Data();
const domUpdates = new DOMupdates();

function getUserData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
    .then(response => response.json())
}

function getHydrationData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
    .then(response => response.json())
}

function getSleepData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
    .then(response => response.json())
}

function getActivityData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
    .then(response => response.json())
}

function createUserInstances(userDataSet, hydrationDataSet, sleepDataSet, activityDataSet) {
  return userDataSet.map(user => new User(user, hydrationDataSet, sleepDataSet, activityDataSet));
}

function createHydrationInstances(dataSet) {
  return dataSet.map(dataPiece => new Hydration(dataPiece));
}

function createSleepInstances(dataSet) {
  return dataSet.map(dataPiece => new Sleep(dataPiece));
}

function createActivityInstances(dataSet) {
  return dataSet.map(dataPiece => new Activity(dataPiece));
}


function getData() {
  return Promise.all([getUserData(), getHydrationData(), getSleepData(), getActivityData()])
    .then(dataSets => {
      const hydrationInstances = createHydrationInstances(dataSets[1].hydrationData);
      const sleepInstances = createSleepInstances(dataSets[2].sleepData);
      const activityInstances = createActivityInstances(dataSets[3].activityData);
      const userInstances = createUserInstances(dataSets[0].userData, hydrationInstances, sleepInstances, activityInstances);
      return [userInstances, hydrationInstances, sleepInstances, activityInstances]
    })
}

getData()
  .then(parsedData => {
    const userData = parsedData[0];
    const hydrationData = parsedData[1];
    const userRepo = new UserRepo(userData);
    const currentUser = userRepo.getDataFromID(pickUser());
    const mostRecentDate = data.sortByDate(hydrationData)[0].date;
    displayUserInfo(currentUser, userRepo);
    displayHydrationInfo(currentUser.hydrationInfo, mostRecentDate);
    displaySleepInfo(currentUser.sleepInfo, mostRecentDate, currentUser);
    displayActivityInfo(currentUser.activityInfo, mostRecentDate, currentUser, userRepo);
  });

function displayUserInfo(currentUser, userRepo) {
  domUpdates.displayHeaderText(currentUser);
  domUpdates.displayUserData(currentUser, userRepo, 'name', '#user-name');
  domUpdates.displayUserData(currentUser, userRepo, 'address', '#user-address');
  domUpdates.displayUserData(currentUser, userRepo, 'email', '#user-email');
  domUpdates.displayUserData(currentUser, userRepo, 'strideLength', '#user-stride-length');
  domUpdates.displayUserData(currentUser, userRepo, 'dailyStepGoal', '#user-step-goal');
  domUpdates.displayUserData(currentUser, userRepo, 'avgDailyStepGoal', '#avg-step-goal');
  domUpdates.displayUserData(currentUser, userRepo, 'friends', '#friend-list');
}

function displayHydrationInfo(dataSet, date) {
  domUpdates.displayDataToday(dataSet, date, 'numOunces', '#hydration-today');
  domUpdates.displayDataForWeek(dataSet, date, 'numOunces', '#hydration-this-week');
  domUpdates.displayDataAverages(dataSet, 'numOunces', '#hydration-average');
}

function displaySleepInfo(dataSet, date, currentUser) {
  domUpdates.displayDataToday(dataSet, date, 'hoursSlept', '#hours-slept-today');
  domUpdates.displayDataToday(dataSet, date, 'sleepQuality', '#sleep-quality-today');
  domUpdates.displayDataForWeek(dataSet, date, 'hoursSlept', '#hours-slept-this-week');
  domUpdates.displayDataForWeek(dataSet, date, 'sleepQuality', '#sleep-quality-this-week');
  domUpdates.displayDataAverages(dataSet, 'hoursSlept', '#hours-slept-average');
  domUpdates.displayDataAverages(dataSet, 'sleepQuality', '#sleep-quality-average');
  domUpdates.displayBestNightOfSleepEver(currentUser);
}

function displayActivityInfo(dataSet, date, currentUser, userRepo) {
  domUpdates.displayDataToday(dataSet, date, 'numSteps', '#num-steps-today');
  domUpdates.displayDataToday(dataSet, date, 'minutesActive', '#minutes-active-today');
  domUpdates.displayMilesWalked(currentUser, date);
  domUpdates.displayDataForWeek(dataSet, date, 'numSteps', '#num-steps-this-week');
  domUpdates.displayDataForWeek(dataSet, date, 'minutesActive', '#minutes-active-this-week');
  domUpdates.displayDataForWeek(dataSet, date, 'flightsOfStairs', '#flights-of-stairs-this-week');
  domUpdates.compareUserToOthers(dataSet, date, 'numSteps', '#num-steps-average', userRepo);
  domUpdates.compareUserToOthers(dataSet, date, 'minutesActive', '#minutes-active-average', userRepo);
  domUpdates.compareUserToOthers(dataSet, date, 'flightsOfStairs', '#flights-of-stairs-average', userRepo);
  domUpdates.displayAllTimeSteps(currentUser);
}

function pickUser() {
  return Math.floor(Math.random() * 50);
}
