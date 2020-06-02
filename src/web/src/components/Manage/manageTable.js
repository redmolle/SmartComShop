import React, { useState, useEffect } from "./node_modules/react";
import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	withStyles,
} from "./node_modules/@material-ui/core";

const styles = (theme) => ({
	root: {
		"& .MuiTableCell-head": {
			fontSize: "1.25rem",
		},
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
	},
});

const manageTable = ({ classes, ...props }) => {
	const [currentId, setCurrentId] = useState(0);
	
	useEffect(() => {
		props.fetch();
	}, []);

	const onDelete = (id) => {
		if (confirm("Уверены, что хотите удалить?")) {
			props.delete(id, () => info("Успешно удалено"));
		}
	};


	return (
		<Paper className={classes.paper} elevation={3}>
			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<TableContainer>
						<Table>
							<TableHead className={classes.root}>
								<TableRow>
									{props.classes.map((column) => {
										if (column.isVisible) {
											return <TableCell>{column.field}</TableCell>;
										}
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								{props.rows.map((row, index) => {
									<TableRow hover key={index}>
										{props.columns.map((column) => {
											if (column.isVisible) {
												return <TableCell>{rows[column.field]}</TableCell>;
											}
										})}

										<ButtonGroup>
											<Button>
												<EditIcon
													color='primary'
													onClick={() => {
														setCurrentId(row.id);
													}}
												/>
											</Button>
											<Button>
												<DeleteIcon
													color='secondary'
													onClick={() => {
														onDelete(row.id);
													}}
												/>
											</Button>
										</ButtonGroup>
									</TableRow>;
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(manageTable);
