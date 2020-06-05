import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Checkbox } from "@material-ui/core";

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

const SmartHead = ({classes, onRequestSort, columns, numSelected, rowCount, handleSelectAllClick, orderBy, order, ...props}) => {
	const handleSort = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead className={classes.root}>
			<TableRow>
				{columns.map((column) => {
					const isOrderBy = () => {
						return orderBy === column.field;
					};

					if (column.isHeader) {
						switch (column.type) {
							case "checkbox":
								return (
									<TableCell padding='checkbox'>
										<Checkbox
											indeterminate={
												numSelected > 0 &&
												numSelected < rowCount
											}
											checked={
												rowCount > 0 &&
												numSelected === rowCount
											}
											onChange={handleSelectAllClick}
											inputProps={{ "aria-label": "Выбрать все на странице" }}
										/>
									</TableCell>
								);
							case "chidren" :
							return props.children
							default:
								return (
									<TableCell
										key={column.field}
										align={column.numeric ? "right" : "left"}
										padding={column.disablePadding ? "none" : "default"}
										sortDirection={isOrderBy() ? order : false}>
										{column.isSortable ? (
											<TableSortLabel
												active={isOrderBy()}
												direction={isOrderBy() ? order : "asc"}
												onClick={handleSort(column.field)}>
												{column.label}
												{isOrderBy() ? (
													<span className={classes.visuallyHidden}>
														{order === "desc"
															? "Отсортированно по убыванию"
															: "Отсортированно по возрастанию"}
													</span>
												) : null}
											</TableSortLabel>
										) : (
											column.label
										)}
									</TableCell>
								);
						}
					}
				})}
			</TableRow>
		</TableHead>
	);
};

export default withStyles(styles)(SmartHead);
