import { Entry } from "@/generated/prisma/client";
import * as entryRepo from "@/lib/repositories/entry-repository"

export async function addEntry(goalId: number, type: string, date: Date) {

	const newEntry: Omit<Entry, "id"> = {

		date: date,
		type: type,
		goalId: goalId

	}

	const entry: Entry = await entryRepo.createEntry(newEntry);

	return entry
}


export async function deleteEntry(id: number) {

	await entryRepo.deleteEntry(id);
}
