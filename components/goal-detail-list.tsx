"use client"
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Checkbox, Divider, List, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import GoalDetails from "./goal-details";
import { GoalDto } from "@/types/GoalDto";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';



interface GoalDetailListProps {
	goals: GoalDto[]
}
export default function GoalDetailList(
	props: GoalDetailListProps
) {
	const id = React.useId();
	const [timeTravelDate, setTimeTravelDate] =
		useState<Dayjs | null>(dayjs(new Date()))

	const [showEntries, setShowEntries] =
		useState(false)

	if (!timeTravelDate) {
		return <>please select date</>
	}
	return <Box>
		<Accordion
			elevation={0}
			disableGutters
			sx={{
				boxShadow: "none",
				"&:before": {
					display: "none",
				},
			}}
		>
			<AccordionSummary
				expandIcon={<SettingsIcon />}
				aria-controls={`${id}-panel1-content`}
				id={`${id}-panel1-header`}
			>
				<Typography component="span"></Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }} spacing={2}>
					<Typography>Show entries</Typography>
					<Switch
						value={showEntries}
						onChange={e => setShowEntries(e.target.checked
						)}
					/>

				</Stack>
				<Box sx={{ m: 1 }}></Box>
				<Divider />
				<Box sx={{ m: 1 }}></Box>
				<Stack direction={"row"} sx={{ alignItems: "center" }} spacing={2}>
					<Typography>Time Travel</Typography>
					<DatePicker
						slotProps={{
							textField: {
								variant: "standard",
								size: "small",
							},
						}}
						value={timeTravelDate}
						onChange={(newValue) => setTimeTravelDate(newValue)}
					/>
				</Stack>
				<Box sx={{ m: 1 }}></Box>
				<Divider />
				<Box sx={{ m: 1 }}></Box>
			</AccordionDetails>
		</Accordion>

		<Typography variant="h6" color="textSecondary">Recurring</Typography>
		<Box sx={{ overflow: "scroll", overflowX: "clip", maxHeight: "76vh" }}>
			<List>
				{props.goals?.filter(x => x.recurring).map(g => {

					return <GoalDetails
						key={g.id}
						goal={g}
						date={timeTravelDate.toDate()}
						showEntries={showEntries}
					></GoalDetails>

				})}
			</List>
		</Box>
		<Typography variant="h6" color="textSecondary">Non Recurring</Typography>
		<Box sx={{ overflow: "scroll", overflowX: "clip", maxHeight: "76vh" }}>
			<List>
				{props.goals?.filter(x => !x.recurring).map(g => {

					return <GoalDetails
						key={g.id}
						goal={g}
						date={timeTravelDate.toDate()}
						showEntries={showEntries}
					></GoalDetails>

				})}
			</List>
		</Box>
	</Box >

}
