import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/CatalogActions";
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
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
import { useToasts } from "react-toast-notifications";

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


const Cart = ({ classes, ...props }) => {
	const {
        currentId,
        setCurrentId,
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
	} = useSmartTable("id", props.ItemList, "name", props.readPage)

    const { addToast } = useToasts();
    
    const addToCart = id => {
        addToast("Товар добавлен в корзину!", { appearance: "success" });
    }

	return (
		<Paper className={classes.paper} elevation={3}>
			<Grid container justify='center'>
				<Grid item xs={6}>
					<SmartToolbar
						title='Корзина'
						searchString={searchString}
						handleChangeSearchString={handleChangeSearchString}
                    />

					<TableContainer>
						<Table stickyHeader classes={classes}>
							<SmartHead
								onRequestSort={onRequestSort}
								columns={catalogColumns}
								rowCount={rowsPerPage}
								classes={classes}
								orderBy={orderBy}
								order={order}
							/>
							<TableBody>
								{props.ItemList.map((row, index) => {
									return (
										<SmartRow
											tabIndex={-1}
											columns={catalogColumns}
											row={row}
											idField={idField}>
                                            <ButtonGroup>
                                                <Button>
                                                    <AddShoppingCartOutlinedIcon color="primary" onClick={() => addToCart(row.id)}/>
                                                </Button>
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
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(Cart));

