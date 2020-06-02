import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
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
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ViewTablePagination from "./ViewTablePagination";
import ViewTableHead from "./ViewTableHead";
import ViewTableToolbar from "./ViewTableToolbar"

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

const ViewTable = ({
	classes,
	columns,
	rows,
	totalCount,
	addToCart,
	orderByProperty,
	title,
	searchString,
	handleChangeSearchString,
	orderBy,order,handleRequestSort,
	page, pageSize, handleChangePage, handleChangePageSize,
	...props
}) => {


	return (
		<Paper className={classes.paper} elevation={3}>
			<ViewTableToolbar
				classes={classes}
				title={title}
				searchString={searchString}
				handleChangeSearchString={handleChangeSearchString}
			/>
			<TableContainer>
				<Table stickyHeader>
					<ViewTableHead
						className={classes.root}
						columns={columns}
						orderBy={orderBy}
						order={order}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{rows.map((row, index) => {
							return (
								<TableRow hover key={index}>
									{columns.map((column) => {
										console.log(column)
										if (column.isVisible) {
											return <TableCell>{row[column.field]}</TableCell>;
										}
									})}
									<ButtonGroup>
										<Button>
											<AddShoppingCartIcon
												color='primary'
												onClick={() => addToCart(row.id)}
											/>
										</Button>
									</ButtonGroup>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<ViewTablePagination
				page={page}
				handleChangePage={handleChangePage}
				rowsPerPage={pageSize}
				handleChangeRowsPerPage={handleChangePageSize}
				totalCount={totalCount}
			/>
		</Paper>
	);
};

export default withStyles(styles)(ViewTable);
