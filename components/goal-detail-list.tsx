"use client"
import { Box, List, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import GoalDetails from "./goal-details";
import { GoalDto } from "@/types/GoalDto";
interface GoalDetailListProps {
	goals: GoalDto[]
}
export default function GoalDetailList(
	props: GoalDetailListProps
) {

	const [timeTravelDate, setTimeTravelDate] = 
		useState<Dayjs | null>(dayjs(new Date()))

	if (!timeTravelDate) {
		return <>please select date</>
	}
	return <Box>
		<Typography>Time Travel</Typography>
		<DatePicker
			value={timeTravelDate}
			onChange={(newValue) => setTimeTravelDate(newValue)}
		/>
		<List>
			{props.goals?.map(g => {

				return <GoalDetails
					key={g.id}
					goal={g}
					date={timeTravelDate.toDate()}
				></GoalDetails>

			})}
		</List>

	</Box>

}
