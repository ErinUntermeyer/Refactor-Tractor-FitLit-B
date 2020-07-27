import User from './User';
import UserRepo from './User-repo';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';
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
};

export default DOMupdates;