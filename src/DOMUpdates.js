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
		hydrationToday.innerHTML = `You drank ${dayHydrationData}oz of water today`;
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
};

export default DOMupdates;