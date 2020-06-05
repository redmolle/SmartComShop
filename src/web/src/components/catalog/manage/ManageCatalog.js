import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/CatalogActions";
import {
	Grid,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	withStyles,
	ButtonGroup,
	Button,
	FormLabel,
	Box,
	Divider,
	Tooltip,
	IconButton,
} from "@material-ui/core";
import CatalogForm from "./CatalogForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import useSmartPagination from "../../table/pagination/useSmartPagination";
import SmartPagination from "../../table/pagination/SmartPagination";
import useSmartHead from "../../table/head/useSmartHead";
import SmartHead from "../../table/head/SmartHead";
import useSmartToolbar from "../../table/toolbar/useSmartToolbar";
import SearchToolbar from "../../table/toolbar/SmartToolbar";
import SmartRow, { useSelectableHead } from "../../table/row/SmartRow";
import useSmartRow from "../../table/row/useSmartRow";
import SmartToolbar from "../../table/toolbar/SmartToolbar";
import useSmartTable from "../../table/useSmartTable"
import catalogColumns from "../catalogColumns";

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

const columns = [
	{
		field: "checkBox",
		label: "",
		type: "checkbox",
		minWidth: 170,
		isHeader: true,
		disablePadding: false,
		numeric: false,
		isTable: true,
		isSortable: false,
	},
	...catalogColumns,
];

const ManageCatalog = ({ classes, ...props }) => {
	const {
        currentId, setCurrentId,
        page,
		setPage,
		rowsPerPage,
		setRowsPerPage,
		emptyRows,
		handleChangePage,
        handleChangeRowsPerPage,
        order,
        setOrder,
        orderBy,
        setOrderBy,
        onRequestSort,
        searchString,
		setSearchString,
        handleChangeSearchString,
        selectedRows,
		setSelectedRows,
		handleSelectRowClick,
		isRowSelected,
		handleSelectAllClick,
		refreshSelected,
        idField,
        refresh,
        onDelete,
	} = useSmartTable("id", props.ItemList, "name", props.readPage, props.deleteItem)

	return (
		<Paper className={classes.paper} elevation={3}>
			<Grid container justify='center'>
				<Grid item xs={6}>
					<CatalogForm
						currentId={currentId}
						setCurrentId={setCurrentId}
					/>
				</Grid>

				<Grid item xs={6}>
					<SmartToolbar
						title='Каталог'
						searchString={searchString}
						handleChangeSearchString={handleChangeSearchString}
						setSelectedRows={setSelectedRows}
						numSelected={selectedRows.length}>
						<Tooltip title='Удалить выделенные записи'>
							<IconButton>
								<DeleteIcon
									color={selectedRows.length !== 0 ? "secondary" : "disabled"}
									onClick={() => onDelete()}
								/>
							</IconButton>
						</Tooltip>
					</SmartToolbar>

					<TableContainer>
						<Table stickyHeader classes={classes}>
							<SmartHead
								onRequestSort={onRequestSort}
								columns={columns}
								numSelected={selectedRows.length}
								rowCount={rowsPerPage}
								handleSelectAllClick={handleSelectAllClick}
								classes={classes}
								orderBy={orderBy}
								order={order}
							/>
							<TableBody>
								{props.ItemList.map((row, index) => {
									return (
										<SmartRow
											isSelected={isRowSelected(row.id)}
											tabIndex={-1}
											role={"checkbox"}
											columns={columns}
											row={row}
											handleClick={handleSelectRowClick}
											idField={idField}>
											<ButtonGroup>
												<IconButton>
													<EditIcon
														color='primary'
														onClick={() => {
															setCurrentId(row.id);
														}}
													/>
												</IconButton>
												<IconButton>
													<DeleteIcon
														color='secondary'
														onClick={() => onDelete(row.id)}
													/>
												</IconButton>
											</ButtonGroup>
										</SmartRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<SmartPagination
						label={"Товаров"}
						page={page}
						rowsPerPage={rowsPerPage}
						handleChangePage={handleChangePage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
						totalCount={props.ItemsCount}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

const mapStateToProps = (state) => ({
	ItemList: state.CatalogReducer.list,
	ItemsCount: state.CatalogReducer.totalCount,
});

const mapActionToProps = {
	readPage: actions.ReadPage,
	deleteItem: actions.Delete,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(ManageCatalog));
