import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/CatalogActions";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import useForm from "../../useForm";
import {
	Grid,
	TextField,
	withStyles,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	FormHelperText,
	ButtonGroup,
	FormLabel,
	IconButton,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			minWidth: 230,
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 230,
	},
	smMargin: {
		margin: theme.spacing(1),
	},
});

const initialFieldValues = {
	name: "",
	category: "",
	code: "",
	price: "",
};

const CatalogForm = ({ classes, ...props }) => {
	const { currentId, setCurrentId } = props;

	const { addToast } = useToasts();

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Обязательный параметр";
		if ("category" in fieldValues)
			temp.category = fieldValues.category ? "" : "Обязательный параметр";
		if ("price" in fieldValues)
			temp.price = fieldValues.price ? "" : "Неверная цена";
		if ("code" in fieldValues)
			temp.code = fieldValues.code ? "" : "Обязательный параметр";
		setErrors({
			...temp,
		});

		if (fieldValues == values) return Object.values(temp).every((x) => x == "");
	};

	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
	} = useForm(initialFieldValues, validate, setCurrentId);

	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			const onSuccess = () => {
				resetForm();
				addToast("Успешно сохранено!", { appearance: "success" });
			};
			if (currentId == 0) {
				props.createItem(values, onSuccess);
			} else {
				console.log(currentId);
				props.updateItem(currentId, values, onSuccess);
			}
		}
	};

	useEffect(() => {
		if (currentId != 0) {
			setValues({ ...props.ItemList.find((x) => x.id == props.currentId) });
		} else {
			resetForm()
		}
		setErrors({});
	}, [currentId]);
	
	return (
		<form
			autoComplete='off'
			noValidate
			className={classes.root}
			onSubmit={handleSubmit}>
			<FormLabel component='legend'>Управление товаром</FormLabel>
			<Grid
				container
				spacing={0}
				direction='column'
				alignItems='center'
				justify='center'>
				<Grid item xs={6}>
					<TextField
						name='name'
						variant='outlined'
						label='Наименование'
						value={values.name}
						onChange={handleInputChange}
						{...(errors.name && { error: true, helperText: errors.name })}
					/>
				</Grid>
				<Grid item xs={6}>
					<FormControl
						variant='outlined'
						className={classes.formControl}
						{...(errors.category && { error: true })}>
						<InputLabel ref={inputLabel}>Категория</InputLabel>
						<Select
							name='category'
							value={values.category}
							onChange={handleInputChange}
							lableWidth={labelWidth}>
							//TODO начитать из бд
							<MenuItem value=''>Выберите категорию:</MenuItem>
							<MenuItem value='Car'>Авто</MenuItem>
							<MenuItem value='Moto'>Мото транспорт</MenuItem>
							<MenuItem value='Water'>Водный транспорт</MenuItem>
						</Select>
						{errors.category && (
							<FormHelperText>{errors.category}</FormHelperText>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name='price'
						variant='outlined'
						type='number'
						label='Цена'
						value={Number(values.price)}
						onChange={handleInputChange}
						{...(errors.price && { error: true, helperText: errors.price })}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name='code'
						variant='outlined'
						label='Код'
						value={values.code}
						onChange={handleInputChange}
						{...(errors.code && { error: true, helperText: errors.code })}
					/>
				</Grid>
				<Grid item xs={6}>
					<ButtonGroup align='center'>
						<IconButton
							variant='contained'
							color='primary'
							type='submit'
							className={classes.smMargin}
							size='large'>
							<SaveOutlinedIcon />
						</IconButton>
						<IconButton
							variant='contained'
							className={classes.smMargin}
							onClick={resetForm}
							size='large'>
							<CancelOutlinedIcon />
						</IconButton>
					</ButtonGroup>
				</Grid>
			</Grid>
		</form>
	);
};

const mapStateToProps = (state) => ({
	ItemList: state.CatalogReducer.list,
});

const mapActionToProps = {
	createItem: actions.Create,
	updateItem: actions.Update,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(CatalogForm));
