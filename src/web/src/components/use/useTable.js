import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { TableFooter, TablePagination, FormControlLabel, Switch, TableRow, TableCell, Button } from "@material-ui/core";

const useTable = ({classes, ...props}) => {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState(props.orderByProperty);
	const [pagination, setPagination] = useState({ page: 0, pageSize: 5 });
	const [dense, setDense] = useState(false);
	const [searchString, setSearchString] = useState("");
	const { addToast } = useToasts();

	const handleChangePage = (event, newPage) => {
		setPagination({ ...pagination, page: newPage });
	};

	const handleChangePageSize = (event) => {
		setPagination({ page: 0, pageSize: parseInt(event.target.value) });
	};
	
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};


	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	  };

	const handleSearchChangeSimple = (search) => {
		setSearchString(search);
	};

	const emptyRows = () =>
		pagination.rowsPerPage -
		Math.min(
			pagination.rowsPerPage,
			props.rows.length - pagination.page * pagination.rowsPerPage
		);

	const refreshRowsOnPage = () => {
		props.refreshRows(
			pagination.page,
			pagination.pageSize,
			order,
			orderBy,
			searchString
		)
	}
	const footer = (
		<TableFooter>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25, { label: "Все", value: -1 }]}
				count={props.totalCount}
				page={pagination.page}
				onChangePage={handleChangePage}
				rowsPerPage={
					pagination.pageSize === -1 ? props.totalCount : pagination.pageSize
				}
				onChangeRowsPerPage={handleChangePageSize}
				labelRowsPerPage={props.paginationTitle + " на странице:"}
			/>
		</TableFooter>
	);
	const emptyStub = emptyRows > 0 && (
		<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
		<TableCell colSpan={6} />
	  </TableRow>
	)
	const denseButton = (
		<FormControlLabel
		 control={<Switch checked={dense} onChange={handleChangeDense} />}
		 label={dense ? <div>Восстановить</div> : <div>Сжать список</div>}
	   />
	)
	
	
	useEffect(() => {
		refreshRowsOnPage()
	 }, [pagination, order, orderBy, searchString, props.totalCount]);

	return {
		refreshRowsOnPage,

		pagination,
		setPagination,
		handleChangePage,
		handleChangePageSize,

		handleRequestSort,

		handleSearchChangeSimple,

		addToast,

		denseButton,
		footer,
		emptyStub,
	};
};

useTable.propTypes = {
	rows: (PropTypes.array.isRequired = true),
	orderByProperty: (PropTypes.string.isRequired = true),
	totalCount: (PropTypes.number.isRequired = true),
	paginationTitle: (PropTypes.string.isRequired = true),
	refreshRows: (PropTypes.func.isRequired = true),
};

export default useTable;
