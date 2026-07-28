import { EntryDto } from "@/types/EntryDto";
import { differenceInDays } from "./date-compare";

export function recentEntries
	(
		waterDuration: number,
		entries: EntryDto[],
		currentDate: Date
	)
	: string[] {

	const result: string[] = []

	entries.map(entry => {

		const difference = differenceInDays(currentDate, entry.date)

		if (waterDuration >= difference && difference >= 0) {
			result.push(entry.type)
		}

		console.log(" ====== difference ", difference)
	})

	console.dir(result)
	console.log(" ====== water duration ", waterDuration)

	return result
}
