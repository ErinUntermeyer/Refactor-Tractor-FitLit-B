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
	// displayHydrationWeek() {
	// 	hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationRepo, userRepo, hydrationRepo.calculateFirstWeekOunces(userRepo, id)));
  // 	// hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationRepo, userStorage, hydrationRepo.calculateRandomWeekOunces(laterDateString, id, userStorage)));
	// };
	// displayAverageHydration() {
	// 	hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${super.calculateAverage(dataSet, '')}</span></p> <p>oz per day.</p>`)
	// };


};


export default DOMUpdates;