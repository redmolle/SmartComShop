import React, { useState, useEffect } from "react";
import { TablePagination } from "@material-ui/core";

const ViewTablePagination = ({ classes, page, handleChangePage, rowsPerPage, handleChangeRowsPerPage, totalCount, ...props }) => {
	return (
		<TablePagination
			component='div'
			rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: -1 }]}
			page={page}
			onChangePage={handleChangePage}
			rowsPerPage={rowsPerPage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			count={totalCount}
		/>
	);
};

export default ViewTablePagination