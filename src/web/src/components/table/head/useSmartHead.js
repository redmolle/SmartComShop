import React, { useState } from "react";

const useSmartHead = (orderByProperty) => {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState(orderByProperty);

	const onRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	return {
        order,
        setOrder,
        orderBy,
        setOrderBy,
        onRequestSort,
	};
};


export default useSmartHead;
