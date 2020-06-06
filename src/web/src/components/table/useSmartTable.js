import useSmartPagination from "./pagination/useSmartPagination";
import useSmartHead from "./head/useSmartHead";
import useSmartToolbar from "./toolbar/useSmartToolbar";
import useSmartRow from "./row/useSmartRow";
import React, {useState, useEffect} from 'react'
import {useToasts} from 'react-toast-notifications'

const useSmartTable = (idFieldCode="id",rows=[],orderProperty="name",refreshMethod=null,deleteMethod=null) => {
    const [currentId, setCurrentId] = useState(0);

    const {
		page,
		setPage,
		rowsPerPage,
		setRowsPerPage,
		emptyRows,
		handleChangePage,
		handleChangeRowsPerPage,
	} = useSmartPagination(rows.length);

	const {
        order,
        setOrder,
        orderBy,
        setOrderBy,
        onRequestSort
    } = useSmartHead(orderProperty);

	const {
		searchString,
		setSearchString,
		handleChangeSearchString,
	} = useSmartToolbar();

	const {
		selectedRows,
		setSelectedRows,
		handleSelectRowClick,
		isRowSelected,
		handleSelectAllClick,
		refreshSelected,
		idField,
	} = useSmartRow(idFieldCode, rows);

	const refresh = () => {
        refreshMethod({
			page: page,
			rowsPerPage: rowsPerPage,
			order: order,
			orderBy: orderBy,
			search: searchString,
		});
        refreshSelected();

    };
    
	useEffect(() => {
		refresh();
	}, [page, rowsPerPage, order, orderBy, searchString, currentId]);

	const { addToast } = useToasts();

	const onDelete = (id) => {
		const muteDelete = (id) => {
			deleteMethod(id, () => {
                addToast("Успешно удалено!", { appearance: "info" });
                console.log(currentId, id, currentId === id)
                if (currentId === id) {
                    setCurrentId(0)
                }
                refresh();
			});
		};
		if (id !== undefined || selectedRows.length === 1) {
			if (window.confirm("Уверены, что хотите удалить?")) {
				muteDelete(id ?? selectedRows[0]);
			}
		} else {
			if (selectedRows.length !== 0) {
				if (
					window.confirm(
						`Уверены, что хотите удалить ${selectedRows.length} элементов?`
					)
				) {
					selectedRows.forEach((id) => muteDelete(id));
				}
			}
		}
    };
    
    return {
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
    }
}

export default useSmartTable