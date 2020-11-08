import React from 'react';
import {
	Button,
	Card,
	CardContent,
	CardActions,
} from '@material-ui/core';

export default function EmailSend() {
	const amount = 4;

	return (
		<Card>
			<CardContent>
				Send email to selected person
				emails.
			</CardContent>
			<CardActions style={{ justifyContent: 'flex-end' }}>
				<Button
					size="small"
					variant="contained"
				>
					Click
				</Button>
			</CardActions>
		</Card>
	);
}
