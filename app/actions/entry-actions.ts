"use server"
import { addEntry, deleteEntry } from "@/lib/services/entry-service";
import { revalidatePath } from "next/cache";

export async function addEntryAction(goalId: number, type: string, date: Date) {
	await addEntry(goalId, type, date)
	revalidatePath("/goals")
	revalidatePath("/")
}

export async function deleteEntryAction(id: number) {
	await deleteEntry(id)
	revalidatePath("/goals")
	revalidatePath("/")
}
