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
		};
	};

	displayHydrationWeek(dataSet, date) {
		const hydrationThisWeek = document.querySelector('#hydration-this-week');
		const weekHydrationData = super.retrieveDataByWeek(dataSet, date);
		weekHydrationData.forEach(day => {
			hydrationThisWeek.innerHTML += `<p>On ${day.date}: ${day.numOunces}oz</p>`;
		});
	};

	displayHydrationAverage(dataSet) {
		const hydrationAverage = document.querySelector('#hydration-average');
		hydrationAverage.innerHTML = `Your average water intake is ${super.calculateAverage(dataSet, 'numOunces')}oz per day.`;
	};

	// avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`);
	// sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)));
	// sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
};


export default DOMupdates;