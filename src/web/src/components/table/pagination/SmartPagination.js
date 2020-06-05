import React from "react";
import { TablePagination } from "@material-ui/core";

const SmartPagination = ({ classes, ...props }) => {

	const {
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
		totalCount,
		label,
	} = props

	return (
		<TablePagination
			component='div'
			rowsPerPageOptions={[5, 10, 25, { label: "Все", value: -1,}]}
			page={page}
			onChangePage={handleChangePage}
			rowsPerPage={
				rowsPerPage === -1 ? totalCount : rowsPerPage
			}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			count={totalCount}
            labelRowsPerPage={label + " на странице:"}
		/>
	);
};

export default SmartPagination;
