import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/CatalogActions";
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
} from "@material-ui/core";
import manageForm from "../Manage/manageForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirm, info } from "../../utils/ui";
import { columns } from '../catalog'
import ViewTable from './Base/ViewTable'
import useViewTable from './Base/useViewTable'

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

const ViewCatalog = ({ classes, ...props }) => {
    
    const {
        currentId, setCurrentId,
        page, setPage,
        pageSize, setPageSize,
        order, setOrder,
        orderBy, setOrderBy,
        searchString, setSearchString,
        handleChangePage,handleChangePageSize, handleRequestSort,
        handleChangeSearchString,
    } = useViewTable("name")

	useEffect(() => {
		props.fetch(page, pageSize, order, orderBy, searchString);
	}, [page, pageSize, order, orderBy, searchString,]);

	return (
        <ViewTable
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangePageSize}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            handleRequestSort={handleRequestSort}
            searchString={searchString}
            setSearchString={setSearchString}
            handleChangeSearchString={handleChangeSearchString}
            currentId={currentId}
            setCurrentId={setCurrentId}
            columns={columns}
            rows={props.rows}
            totalCount={props.totalCount}
            // addToCart={() => {}}
            title={'Каталог'}
        />
	);
};

const mapStateToProps = (state) => ({
	rows: state.CatalogReducer.list,
	totalCount: state.CatalogReducer.totalCount,
});

const mapActionToProps = {
	fetch: actions.EnhancedFetch,
	create: actions.Create,
	delete: actions.Delete,
	update: actions.Update,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(ViewCatalog));
