import { Entry } from "@/generated/prisma/client";
import * as entryRepo from "@/lib/repositories/entry-repository"

export async function addEntry(type: string) {

	const newEntry: Omit<Entry, "id"> = {

		date: new Date(),
		type: type

	}

	const entry: Entry = await entryRepo.createEntry(newEntry);

	return entry
}


export async function deleteEntry(id: number) {

	await entryRepo.deleteEntry(id);
}
