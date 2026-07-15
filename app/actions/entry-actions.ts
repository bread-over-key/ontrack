"use server"
import { addEntry, deleteEntry } from "@/lib/services/entry-service";
import { revalidatePath } from "next/cache";

export async function addEntryAction(type: string) {
	await addEntry(type)
	revalidatePath("/goals")
}

export async function deleteEntryAction(id: number) {
	await deleteEntry(id)
	revalidatePath("/goals")
}
