import { Entry } from "@/generated/prisma/client";
import { prisma } from "../prisma";

export async function getAll() {

	return await prisma.entry.findMany();

}


export async function getEntry(id: number) {
	return await prisma.entry.findUnique(
		{
			where: {
				id: id
			}
		}
	)
}

export async function createEntry(entry: Entry) {
	return await prisma.entry.create({
		data: entry
	})
}

export async function updateEntry(id: number, entry: Entry) {
	return await prisma.entry.update(
		{
			where: {
				id: id
			},
			data: entry
		}
	)
}

export async function deleteEntry(id: number) {
	return await prisma.entry.delete(
		{
			where: {
				id: id
			}
		}
	)
}
