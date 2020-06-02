import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/CatalogActions";
import {
	Button,
	DialogTitle,
	DialogContentText,
	DialogActions,
	DialogContent,
	Grid,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	FormHelperText,
	Select,
	withStyles,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import useForm from "../use/useForm";
import { columns } from "../Catalog";
import ManagerTable from "./ManagerTable";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import useDialog from "../use/useDialog";
import CatalogForm from "./DialogForm";

// const styles = (theme) => ({
// 	root: {
// 		"& .MuiTextField-root": {
// 			margin: theme.spacing(1),
// 			minWidth: 230,
// 		},
// 	},
// 	formControl: {
// 		margin: theme.spacing(1),
// 		minWidth: 230,
// 	},
// 	smMargin: {
// 		margin: theme.spacing(1),
// 	},
// });

const initialFieldValues = {
	name: "",
	category: "",
	code: "",
	price: 100,
};

// export const EditingDialog = (props) => {
// 	const classes = styles;
// 	const { addToast } = useToasts();
// 	const {
// 		currentId,
// 		setCurrentId,
// 		handleCloseDialog,
// 		create,
// 		update,
// 		rows,
// 	} = props;


// 	const inputLabel = useRef(null);
// 	const [labelWidth, setLabelWidth] = useState(0);
// 	useEffect(() => {
// 		setLabelWidth(inputLabel.current.offsetWidth);
// 	}, []);

// 	const {
// 		values,
// 		setValues,
// 		errors,
// 		setErrors,
// 		handleInputChange,
// 		resetForm,
// 	} = useForm(initialFieldValues, validate, setCurrentId);

// 	console.log(values);

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

// 	console.log("e", values);
// 	return (
// 		<form autoComplete='off' noValidate>
// 			<DialogTitle id='form-dialog-title'>Товар</DialogTitle>
// 			<DialogContent>
// 				<DialogContentText>
// 					{currentId === 0 ? (
// 						<div>Создание нового товара</div>
// 					) : (
// 						<div>Изменение товара</div>
// 					)}
// 				</DialogContentText>
// 				{/* <Grid container>
// 					<Grid item xs={6}> */}
// 				<TextField
// 					name='name'
// 					variant='outlined'
// 					label='Название'
// 					value={values.name}
// 					onChange={handleInputChange}
// 					{...(errors.name && { error: true, helperText: errors.name })}
// 				/>
// 				<FormControl
// 					variant='outlined'
// 					className={classes.formControl}
// 					{...(errors.category && { error: true })}>
// 					<InputLabel ref={inputLabel}>Категория</InputLabel>
// 					<Select
// 						name='category'
// 						value={values.category}
// 						onChange={handleInputChange}
// 						lableWidth={labelWidth}>
// 						<MenuItem value=''>Выберите категорию:</MenuItem>
// 						<MenuItem value='Car'>Авто</MenuItem>
// 						<MenuItem value='Moto'>Мото транспорт</MenuItem>
// 						<MenuItem value='Water'>Водный транспорт</MenuItem>
// 					</Select>
// 					{errors.category && (
// 						<FormHelperText>{errors.category}</FormHelperText>
// 					)}
// 				</FormControl>
// 				<TextField
// 					name='price'
// 					variant='outlined'
// 					type='number'
// 					label='Цена'
// 					value={Number(values.price)}
// 					onChange={handleInputChange}
// 					{...(errors.price && { error: true, helperText: errors.price })}
// 				/>
// 				<TextField
// 					name='code'
// 					variant='outlined'
// 					label='Код'
// 					value={values.code}
// 					onChange={handleInputChange}
// 					{...(errors.code && { error: true, helperText: errors.code })}
// 				/>
// 				{/* </Grid>
// 				</Grid> */}
// 			</DialogContent>
// 			<DialogActions>
// 				<Button onClick={handleCloseDialog} color='secondary'>
// 					<CancelOutlinedIcon />
// 				</Button>
// 				<Button onClick={handleSubmit} color='primary'>
// 					<SaveOutlinedIcon />
// 				</Button>
// 			</DialogActions>
// 		</form>
// 	);
// };



// const validate = (fieldValues = values) => {
// 	let temp = { ...errors };
// 	if ("name" in fieldValues)
// 		temp.name = fieldValues.name ? "" : "Обязательное поле.";
// 	if ("category" in fieldValues)
// 		temp.category = fieldValues.category ? "" : "Обязательное поле.";
// 	if ("price" in fieldValues)
// 		temp.price = fieldValues.price ? "" : "Неверный формат.";
// 	if ("code" in fieldValues)
// 		temp.code = fieldValues.code ? "" : "Обязательное поле.";
// 	setErrors({
// 		...temp,
// 	});

// 	if (fieldValues === values)
// 		return Object.values(temp).every((x) => x === "");
// };

const ManagerCatalog = ({ classes, ...props }) => {
	// const {
	// 	currentId,
	// 	setCurrentId,
	// 	openDialog,
	// 	setOpenDialog,
	// 	handleOpenDialog,
	// 	handleCloseDialog,
	// } = useDialog();

	return (
		<ManagerTable
			title={"Каталог"}
			columns={columns}
			rows={props.CatalogList}
			orderByProperty={"name"}
			totalCount={props.ItemsCount}
			paginationTitle={"Товаров"}
			refreshRows={props.fetchCatalog}
			deleteRow={props.deleteItem}
			dialogText={'Редактирование товара'}
			dialogTitle={"Каталог"}
			initialFieldValues={initialFieldValues}
			create={props.createItem}
			update={props.updateItem}
			// dialogBody={<DialogBody/>}
			// dialogValidation=
			// currentId={currentId}
			// setOpenDialog={setOpenDialog}
			// setCurrentId={setCurrentId}
			// openDialog={openDialog}
			// children={EditingDialog}
			// // <EditingDialog
			// 	currentId={currentId}
			// 	handleCloseDialog={handleCloseDialog}
			// 	setCurrentId={setCurrentId}
			// />
			// {...{
			// 	currentId,
			// 	setCurrentId,
			// 	openDialog,
			// 	setOpenDialog,
			// 	handleOpenDialog,
			// 	handleCloseDialog,
			// }}
		/>
	);
};

const mapStateToProps = (state) => ({
	CatalogList: state.CatalogReducer.list,
	ItemsCount: state.CatalogReducer.totalCount,
});

const mapActionToProps = {
	fetchCatalog: actions.EnhancedFetch,
	deleteItem: actions.Delete,
	createItem: actions.Create,
	updateItem: actions.Update,
};

export default connect(mapStateToProps, mapActionToProps)(ManagerCatalog);
