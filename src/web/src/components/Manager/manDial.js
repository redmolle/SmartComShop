// import React, { useEffect, useState, useRef } from "react";
// import { connect } from "react-redux";
// import * as actions from '../../actions/CatalogActions';
// import {
// 	Button,
// 	DialogTitle,
// 	DialogContentText,
// 	DialogActions,
// 	DialogContent,
// 	Grid,
// 	TextField,
// 	FormControl,
// 	InputLabel,
// 	MenuItem,
// 	FormHelperText,
// 	Select,
// 	withStyles,
// 	Dialog,
// } from "@material-ui/core";
// import { useToasts } from "react-toast-notifications";
// import useForm from "../use/useForm";
// import { columns } from "../Catalog";
// import ManagerTable from "./ManagerTable";
// import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
// import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
// import useDialog from "../use/useDialog";
// import CatalogForm from "./DialogForm";


// const manDial = ({classes,...props}) => {
// 	const { addToast } = useToasts();
// 	const {
// 		currentId,
// 		setCurrentId,
// 		handleCloseDialog,
// 		openDialog,
// 		create,
// 		update,
// 		rows,
// 		validate,
// 		title,
// 		text,
// 	} = props
    
//     const inputLabel = useRef(null);
//     const [labelWidth, setLabelWidth] = useState(0);
//     useEffect(() => {
//         setLabelWidth(inputLabel.current.offsetWidth);
//     }, []);

// 	const {
// 		values,
// 		setValues,
// 		errors,
// 		setErrors,
// 		handleInputChange,
// 		resetForm,
		
// 	} = useForm(initialFieldValues, validate, setCurrentId);

// console.log(values)

// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		if (validate()) {
// 			const onSuccess = () => {
// 				resetForm();
// 				addToast("Изменения успешно внесены!", { appearance: "success" });
// 			};
// 			if (currentId === 0) create(values, onSuccess);
// 			else update(currentId, values, onSuccess);
// 		}
// 	};

// 	useEffect(() => {
// 		if (currentId !== 0)
// 			setValues({
// 				...rows.find((x) => x.id === currentId),
// 			});
// 		setErrors({});
// 	}, [currentId]);

// 	console.log('e',values)
// 	return (
// 		)

// export default manDial;