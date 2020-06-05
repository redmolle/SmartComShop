import React, {useState} from 'react'

const useSmartRow = (idField, rows) => {
	const [selectedRows, setSelectedRows] = useState([]);

	const handleSelectRowClick = (event, name) => {
        const selectedIndex = selectedRows.indexOf(name);
        let newSelected = [];

        console.log(name)
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedRows, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
          newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedRows.slice(0, selectedIndex),
            selectedRows.slice(selectedIndex + 1),
          );
        }
    
        setSelectedRows(newSelected);
        console.log(newSelected)
	};

	const isRowSelected = (name) => {
		return selectedRows.indexOf(name) !== -1;
    };
    
	
	const refreshSelected = () => {
		setSelectedRows(selectedRows.filter(row => isRowSelected(row[idField])))
	}

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n[idField]);
          setSelectedRows(newSelecteds);
          console.log(selectedRows)
          return;
        }
        setSelectedRows([]);
      };

	return {
		selectedRows,
		setSelectedRows,
		handleSelectRowClick,
        isRowSelected,
        handleSelectAllClick,
        refreshSelected,
        idField,
	};
};

export default useSmartRow