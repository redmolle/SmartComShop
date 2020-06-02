import React, {useState} from 'react'

const useManageTable = (orderByProperty) => {
    const [currentId, setCurrentId] = useState(0);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState(orderByProperty);
    const [searchString, setSearchString] = useState("");
    
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangePageSize = (event) => {
		setPageSize(+event.target.value);
		setPage(0);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
    };

    const handleChangeSearchString = event => {
        setSearchString(event.target.value ? event.target.value : "")
    }
    
    return {
        currentId, setCurrentId,
        page, setPage,
        pageSize, setPageSize,
        order, setOrder,
        orderBy, setOrderBy,
        searchString, setSearchString,
        handleChangePage,handleChangePageSize, handleRequestSort,
        handleChangeSearchString,
    }
}

export default useManageTable