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
			console.log("is same date")
			lastDate = x
			return
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

	if (isSameDate(date1, date2))
		return 0

	var diff = date1.setHours(0, 0, 0, 0) - date2.getTime();
	var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
	return diffDays
}
