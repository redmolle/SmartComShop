import React, { useState, Children } from "react";
import {
	TablePagination,
	TableRow,
	Checkbox,
	TableCell,
	TableContainer,
	Table,
	TableBody,
} from "@material-ui/core";

// export const useSelectableHead = (rows, setSelectedRows) => {
// 	const handleAllClick = (event) => {
// 		if (event.target.checked) {
// 			const newSelecteds = rows.map((n) => n.name);
// 			setSelectedRows(newSelecteds);
// 			return;
// 		}
// 		setSelectedRows([]);
// 	};
// };

const SmartRow = ({ classes, ...props }) => {
	const {
		isSelected,
		tabIndex,
		role,
		columns,
		row,
		handleClick,
		idField,
	} = props;

	const key = row[idField];
	const labelId = `enhanced-table-checkbox-${key}`;

	return (
		<TableRow
			hover
			role={role}
			tabIndex={tabIndex}
			aria-checked={isSelected}
			selected={isSelected}
			key={key}>
			{columns.map((column) => {
				if (column.type === "checkbox") {
					return (
						<TableCell
							padding='checkbox'
							onClick={(event) => handleClick(event, key)}>
							<Checkbox
								checked={isSelected}
								inputProps={{ "aria-labelledby": labelId }}
							/>
						</TableCell>
					);
				} else if (column.isFirst) {
					return (
						<TableCell component='th' id={labelId} scope='row' padding='none'>
							{row.name}
						</TableCell>
					);
				} else if (column.type === "children") {
					return <TableCell>{props.children}</TableCell>;
				} else {
					return (
						<TableCell align={column.align}>{row[column.field]}</TableCell>
					);
				}
			})}
		</TableRow>
	);
};

export default SmartRow;
