import Data from './Data';


class DOMupdates extends Data {
	displayDataToday(dataSet, date, attribute, elementID) {
		const pageElement = document.querySelector(elementID);
		const dataForDay = super.retrieveDataByDay(dataSet, date, attribute);
		switch(attribute) {
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
		};
	};

	displayMilesWalked(user, date) {
		const milesWalkedToday = document.querySelector('#miles-walked-today');
		const activityForDay = super.retrieveDataByDay(user.activityInfo, date);

		if (activityForDay === 0) {
			return 0;
		}

		const milesWalked = activityForDay.calculateMilesWalked(user);
		milesWalkedToday.innerHTML = `You walked ${milesWalked} miles today`;
	};

	displayDataForWeek(dataSet, date, attribute, elementID) {
		const pageElement = document.querySelector(elementID);
		const dataForWeek = super.retrieveDataByWeek(dataSet, date);
		switch(attribute) {
			case 'numOunces':
				dataForWeek.forEach(day => {
					pageElement.innerHTML += `<p>On ${day.date}: ${day.numOunces}oz</p>`;
				});
				break;
			case 'hoursSlept':
				dataForWeek.forEach(day => {
					pageElement.innerHTML += `<p>On ${day.date} you slept ${day.hoursSlept} hours</p>`;
				});
				break;
			case 'sleepQuality':
				dataForWeek.forEach(day => {
					pageElement.innerHTML += `<p>On ${day.date} your sleep quality was ${day.sleepQuality} out of 5</p>`;
				});
				break;
			case 'numSteps':
				dataForWeek.forEach(day => {
					pageElement.innerHTML += `<p>On ${day.date} you took ${day.numSteps} steps</p>`;
				});
				break;
			case 'minutesActive':
				dataForWeek.forEach(day => {
					pageElement.innerHTML += `<p>On ${day.date} you were active for ${day.minutesActive} minutes</p>`;
				});
				break;
			case 'flightsOfStairs':
				dataForWeek.forEach(day => {
					pageElement.innerHTML += `<p>On ${day.date} climbed ${day.flightsOfStairs} flights of stairs</p>`;
				});
				break;

		};
	};

	displayDataAverages(dataSet, attribute, elementID) {
		const pageElement = document.querySelector(elementID);
		const dataAverages = super.calculateAverage(dataSet, attribute);
		switch(attribute) {
			case 'numOunces':
				pageElement.innerHTML = `Your average water intake is ${dataAverages}oz per day`;
				break;
			case 'hoursSlept':
				pageElement.innerHTML = `You slept an average of ${dataAverages} hours per night`;
				break;
			case 'sleepQuality':
				pageElement.innerHTML = `Your average sleep quality was ${dataAverages} out of 5`;
		};
	};

	compareUserToOthers(dataSet, date, attribute, elementID, userRepo) {
		const pageElement = document.querySelector(elementID);
		const userData = super.retrieveDataByDay(dataSet, date);
		const avgOfAllData = super.calculateAverage(userRepo.users, attribute, date);
		switch(attribute) {
			case 'numSteps':
				pageElement.innerHTML = `Step Count: ${userData} All users: ${avgOfAllData}`;
				break;
			case 'minutesActive':
				pageElement.innerHTML = `Minutes Active: ${userData} All users: ${avgOfAllData}`;
				break;
			case 'flightsOfStairs':
				pageElement.innerHTML = `Flights of Stairs: ${userData} All users: ${avgOfAllData}`;
				break;
		}
	}

	addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
	  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
	  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)
		avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
	  bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")));
	}
};

export default DOMupdates;
