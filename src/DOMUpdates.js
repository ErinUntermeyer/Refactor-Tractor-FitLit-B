import User from './User';
import UserRepo from './User-repo';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';
import Data from './Data';

class DOMUpdates extends Data {
	displayHydrationToday(dataSet, date) {
		hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${super.retrieveDataByDay(dataSet, date, 'numOunces')}</span></p><p>oz water today.</p>`);
	};

	makeHydrationHTML(weeksData) {
		return weeksData.map(dayData => `<li class="historical-list-listItem">On ${dayData.date}: ${dayData.numOunces}oz</li>`).join('');
	};

	displayHydrationWeek(dataSet, date) {
		hydrationThisWeek.insertAdjacentHTML('afterBegin', this.makeHydrationHTML(super.retrieveDataByWeek(dataSet, date)));
  	// hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationRepo, userStorage, hydrationRepo.calculateRandomWeekOunces(laterDateString, id, userStorage)));
	};
	// displayAverageHydration() {
	// 	hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${super.calculateAverage(dataSet, '')}</span></p> <p>oz per day.</p>`)
	// };


};


export default DOMUpdates;