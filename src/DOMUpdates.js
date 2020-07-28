import Data from './Data';

class DOMupdates extends Data {
  displayHeaderText(user) {
    const headerText = document.querySelector('#header-text');
    headerText.innerHTML = `${user.getFirstName()}'s Activity Tracker`;
  }

  displayUserData(user, userRepo, attribute, elementID) {
    const pageElement = document.querySelector(elementID);
    const friendNames = user.getFriendsNames(userRepo);
    switch (attribute) {
    case 'name':
      pageElement.innerHTML = user.name;
      break;
    case 'address':
      pageElement.innerHTML = user.address;
      break;
    case 'email':
      pageElement.innerHTML = user.email;
      break;
    case 'strideLength':
      pageElement.innerHTML = `Your stridelength is ${user.strideLength} feet`;
      break;
    case 'dailyStepGoal':
      pageElement.innerHTML = `Your daily step goal is ${user.dailyStepGoal}`;
      break;
    case 'avgDailyStepGoal':
      pageElement.innerHTML = `The average daily step goal is ${super.calculateAverage(userRepo.users, 'dailyStepGoal')}`;
      break;
    case 'friends':
      friendNames.forEach(friend => {
        pageElement.innerHTML += `<li>${friend}</li>`;
      })
    }
  }

  displayDataToday(dataSet, date, attribute, elementID) {
    const pageElement = document.querySelector(elementID);
    const dataForDay = super.retrieveDataByDay(dataSet, date, attribute);
    switch (attribute) {
    case 'numOunces':
      pageElement.innerHTML = `You drank ${dataForDay}oz of water today`;
      break;
    case 'hoursSlept':
      pageElement.innerHTML = `You slept ${dataForDay} hours today`;
      break;
    case 'sleepQuality':
      pageElement.innerHTML = `Your sleep quality was ${dataForDay} out of 5`;
      break;
    case 'numSteps':
      pageElement.innerHTML = `You took ${dataForDay} steps today`
      break;
    case 'minutesActive':
      pageElement.innerHTML = `You were active for ${dataForDay} minutes today`;
      break;
    }
  }

  displayMilesWalked(user, date) {
    const milesWalkedToday = document.querySelector('#miles-walked-today');
    const activityForDay = super.retrieveDataByDay(user.activityInfo, date);

    if (activityForDay === 0) {
      const milesWalked = 0;
      milesWalkedToday.innerHTML = `You walked ${milesWalked} miles today`;
      return;
    }

    const milesWalked = activityForDay.calculateMilesWalked(user)
    milesWalkedToday.innerHTML = `You walked ${milesWalked} miles today`;
  }

  displayDataForWeek(dataSet, date, attribute, elementID) {
    const pageElement = document.querySelector(elementID);
    const dataForWeek = super.retrieveDataByWeek(dataSet, date);
    switch (attribute) {
    case 'numOunces':
      dataForWeek.forEach(day => {
        pageElement.innerHTML += `<li>On ${day.date}: ${day.numOunces}oz</li>`;
      });
      break;
    case 'hoursSlept':
      dataForWeek.forEach(day => {
        pageElement.innerHTML += `<li>On ${day.date} you slept ${day.hoursSlept} hours</li>`;
      });
      break;
    case 'sleepQuality':
      dataForWeek.forEach(day => {
        pageElement.innerHTML += `<li>On ${day.date} your sleep quality was ${day.sleepQuality} out of 5</li>`;
      });
      break;
    case 'numSteps':
      dataForWeek.forEach(day => {
        pageElement.innerHTML += `<li	>On ${day.date} you took ${day.numSteps} steps</li	>`;
      });
      break;
    case 'minutesActive':
      dataForWeek.forEach(day => {
        pageElement.innerHTML += `<li	>On ${day.date} you were active for ${day.minutesActive} minutes</li	>`;
      });
      break;
    case 'flightsOfStairs':
      dataForWeek.forEach(day => {
        pageElement.innerHTML += `<li	>On ${day.date} climbed ${day.flightsOfStairs} flights of stairs</li	>`;
      });
      break;
    }
  }

  displayDataAverages(dataSet, attribute, elementID) {
    const pageElement = document.querySelector(elementID);
    const dataAverages = super.calculateAverage(dataSet, attribute);
    switch (attribute) {
    case 'numOunces':
      pageElement.innerHTML = `Your average water intake is ${dataAverages}oz per day`;
      break;
    case 'hoursSlept':
      pageElement.innerHTML = `You slept an average of ${dataAverages} hours per night`;
      break;
    case 'sleepQuality':
      pageElement.innerHTML = `Your average sleep quality was ${dataAverages} out of 5`;
    }
  }

  compareUserToOthers(dataSet, date, attribute, elementID, userRepo) {
    const pageElement = document.querySelector(elementID);
    const userData = super.retrieveDataByDay(dataSet, date);
    const avgOfAllData = super.calculateAverage(userRepo.users, attribute, date);
    switch (attribute) {
    case 'numSteps':
      pageElement.innerHTML = `Step Count: ${userData.numSteps} All users: ${avgOfAllData}`;
      break;
    case 'minutesActive':
      pageElement.innerHTML = `Minutes Active: ${userData.minutesActive} All users: ${avgOfAllData}`;
      break;
    case 'flightsOfStairs':
      pageElement.innerHTML = `Flights of Stairs: ${userData.flightsOfStairs} All users: ${avgOfAllData}`;
      break;
    }
  }

  displayBestNightOfSleepEver(user) {
    const bestSleepElement = document.querySelector('#best-sleep-ever')
    const bestSleep = user.findBestNightOfSleepEver()
    bestSleepElement.innerHTML = `On ${bestSleep.date} you had the best night of sleep ever!`;
  }

  displayAllTimeSteps(user) {
    const allTimeStepsElement = document.querySelector('#all-time-steps')
    const allTimeSteps = user.findRecordSteps()
    allTimeStepsElement.innerHTML = `Your all time steps record is ${allTimeSteps.numSteps}!`
  }
}

export default DOMupdates;
