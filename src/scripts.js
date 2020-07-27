import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
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

var sidebarName = document.getElementById('sidebarName');
var stepGoalCard = document.getElementById('stepGoalCard');
var headerText = document.getElementById('headerText');
var userAddress = document.getElementById('userAddress');
var userEmail = document.getElementById('userEmail');
var userStridelength = document.getElementById('userStridelength');
var friendList = document.getElementById('friendList');
var hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
var historicalWeek = document.querySelectorAll('.historicalWeek');
var avUserSleepQuality = document.getElementById('avUserSleepQuality');
var friendChallengeListToday = document.getElementById('friendChallengeListToday');
var friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
var bigWinner = document.getElementById('bigWinner');
var avgStepsToday = document.getElementById('avgStepsToday');
var userStairsToday = document.getElementById('userStairsToday');
var avgStairsToday = document.getElementById('avgStairsToday');
var avgMinutesToday = document.getElementById('avgMinutesToday');
var bestUserSteps = document.getElementById('bestUserSteps');
var streakList = document.getElementById('streakList');
var streakListMinutes = document.getElementById('streakListMinutes')

// fetch all data

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
    const sleepData = parsedData[2];
		const activityData = parsedData[3];
		const userRepo = new UserRepo(userData);
		const currentUser = userRepo.getDataFromID(pickUser());
		addInfoToSidebar(currentUser, userRepo);
		const mostRecentDate = data.sortByDate(hydrationData)[0].date;
		displayHydrationInfo(currentUser.hydrationInfo, mostRecentDate);
		displaySleepInfo(currentUser.sleepInfo, mostRecentDate);
		displayActivityInfo(currentUser.activityInfo, mostRecentDate, currentUser);
	});
	
	function displayHydrationInfo(dataSet, date) {
		domUpdates.displayDataToday(dataSet, date, 'numOunces', '#hydration-today');
		domUpdates.displayDataForWeek(dataSet, date, 'numOunces', '#hydration-this-week');
		domUpdates.displayDataAverages(dataSet, 'numOunces', '#hydration-average');
	};

	function displaySleepInfo(dataSet, date) {
		domUpdates.displayDataToday(dataSet, date, 'hoursSlept', '#hours-slept-today');
		domUpdates.displayDataToday(dataSet, date, 'sleepQuality', '#sleep-quality-today');
		domUpdates.displayDataForWeek(dataSet, date, 'hoursSlept', '#hours-slept-this-week');
		domUpdates.displayDataForWeek(dataSet, date, 'sleepQuality', '#sleep-quality-this-week');
		domUpdates.displayDataAverages(dataSet, 'hoursSlept', '#hours-slept-average');
		domUpdates.displayDataAverages(dataSet, 'sleepQuality', '#sleep-quality-average');
	};

	function displayActivityInfo(dataSet, date, user) {
		domUpdates.displayDataToday(dataSet, date, 'numSteps', '#num-steps-today');
		domUpdates.displayDataToday(dataSet, date, 'minutesActive', '#minutes-active-today');
		domUpdates.displayMilesWalked(user, date);
		domUpdates.displayDataForWeek(dataSet, date, 'numSteps', '#num-steps-this-week');
		domUpdates.displayDataForWeek(dataSet, date, 'minutesActive', '#minutes-active-this-week');
		domUpdates.displayDataForWeek(dataSet, date, 'flightsOfStairs', '#flights-of-stairs-this-week');
	};


async function startApp() {
	let randomHistory = makeRandomDate(userRepo, currentUser.id, await retrieveHydrationData());
	historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
	let winnerNow = makeWinnerID(activityRepo, currentUser, today, userRepo);
	addFriendGameInfo(currentUser.id, activityRepo, userRepo, today, randomHistory, currentUser);
}

function pickUser() {
	return Math.floor(Math.random() * 50);
}

function addInfoToSidebar(user, userStorage) {
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
  avStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
};

function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage){
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)
	avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
  bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")));
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}