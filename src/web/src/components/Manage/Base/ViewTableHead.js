import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const styles = () => ({
	root: {
		".MuiTableHead-root": {
			width: "100%",
		},
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
});

const ViewTableHead = ({ classes, columns, orderBy, order, onRequestSort, ...props }) => {

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};
	console.log(columns)
	return (
		<TableHead className={classes.root}>
			<TableRow>
				{columns.map((column) => {
					if (column.isVisible) {
						console.log(column)
						return (
					<TableCell
						key={column.field}
						align={column.numeric ? "right" : "left"}
						padding={column.disablePadding ? "none" : "default"}
						sortDirection={orderBy === column.id ? order : false}>
						<TableSortLabel
							active={orderBy === column.id}
							direction={orderBy === column.id ? order : "asc"}
							onClick={createSortHandler(column.field)}>
							{column.label}
							{orderBy === column.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc"
										? "Отсортированно по убыванию"
										: "Отсортированно по возрастанию"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>)}
				})}
			</TableRow>
		</TableHead>
	);
};

export default withStyles(styles)(ViewTableHead);
