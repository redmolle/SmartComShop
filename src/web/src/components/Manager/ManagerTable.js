import React, { useState, useEffect } from "react";
import {
	Paper,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Checkbox,
	ButtonGroup,
	Button,
	Dialog,
	FormControlLabel,
	Switch,
} from "@material-ui/core";
import EnhancedTableHead from "../EnhancedTable/EnhancedTableHead";
import PropTypes from "prop-types";
import EnhancedTableToolbar from "../EnhancedTable/EnhancedTableToolbar";
import { useToasts } from "react-toast-notifications";
import useTable from "../use/useTable";
import { withStyles } from "@material-ui/core/styles";
import useManagerTable from "./useManagerTable";
import {EditingDialog} from './ManagerCatalog'

const styles = (theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
});

const ManagerTable = ({ classes, ...props }) => {
	const { toolbar, head, body, footer, denseButton, dialog } 
	= useManagerTable({
		classes,
		...props,
	});
	// props.title,
	// props.columns,
	// props.rows, totalCount, paginationTitle, refreshRowsOnPage, orderByProperty, deleteRow);
	// console.log(props.openDialog)

	return (
		<div>
			<Paper className={classes.paper} elevation={3}>
				{toolbar}
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label='sticky table'>
						{head}
						{body}
					</Table>
				</TableContainer>
				{footer}
				{dialog}
			</Paper>
			{denseButton}
		</div>
	);
};

ManagerTable.propTypes = {
	title: (PropTypes.string.isReqired = true),
	columns: (PropTypes.array.isRequired = true),
	rows: (PropTypes.array.isRequired = true),
	refreshRows: (PropTypes.func.isRequired = true),
	totalCount: (PropTypes.number.isRequired = true),
	orderByProperty: (PropTypes.string.isRequired = true),
	paginationTitle: (PropTypes.string.isRequired = true),
    deleteRow: (PropTypes.func.isRequired = true),
    handleCloseDialog: (PropTypes.func.isRequired = true),
	editingDialog: (PropTypes.func.isRequired = true),
	openDialog: (PropTypes.bool.isRequired = true),
	setOpenDialog: (PropTypes.func.isRequired = true),
};

export default withStyles(styles)(ManagerTable);
