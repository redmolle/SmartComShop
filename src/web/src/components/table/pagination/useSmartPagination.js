import React, { useState } from "react";

const useSmartPagination = (rowsCount) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)

	const handleChangePage = (event, newPage) => {
        setPage(newPage)
	};

	const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
	};

	const emptyRows = () =>
		rowsPerPage - Math.min(
			rowsPerPage,
			rowsCount - page * rowsPerPage
        );
        
    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        emptyRows,
        handleChangePage,
        handleChangeRowsPerPage,
    }
}

export default useSmartPagination