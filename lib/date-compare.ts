export function isSameDate(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}


export function findLastDate(reference: Date, dates: Date[]) {

	let lastDate: Date | undefined = undefined;

	dates.map(x => {
		if (isSameDate(reference, x)) {
			lastDate = x
		}

		if (x > reference) {
			return
		}

		if (!lastDate) {
			lastDate = x
		}

		if (lastDate < x) {
			lastDate = x
		}
	})

	return lastDate
}


export function differenceInDays(date1: Date, date2: Date) {

	var diff = Math.abs(date1.getTime() - date2.getTime());
	var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
	return diffDays
}
