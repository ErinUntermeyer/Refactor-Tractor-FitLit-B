import User from './User';
import UserRepo from './User-repo';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';
import Data from './Data';


class DOMupdates extends Data {
	displayHydrationToday(dataSet, date) {
		const hydrationToday = document.querySelector('#hydration-today');
		const dayHydrationData = super.retrieveDataByDay(dataSet, date, 'numOunces');
		hydrationToday.innerHTML += `You drank ${dayHydrationData}oz of water today`;
	};

	displayHydrationWeek(dataSet, date) {
		const hydrationThisWeek = document.querySelector('#hydration-this-week');
		const weekHydrationData = super.retrieveDataByWeek(dataSet, date);
		weekHydrationData.forEach(day => {
			hydrationThisWeek.innerHTML += `<p>On ${day.date}: ${day.numOunces}oz</p>`;
		});
	};
	// hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationRepo, userStorage, hydrationRepo.calculateRandomWeekOunces(laterDateString, id, userStorage)));

	// displayAverageHydration() {
	// 	hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${super.calculateAverage(dataSet, '')}</span></p> <p>oz per day.</p>`)
	// };


};

export default DOMupdates;