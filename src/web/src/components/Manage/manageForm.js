// import React, { useState, useEffect } from "react";
// import {
// 	Grid,
// 	TextField,
// 	withStyles,
// 	FormControl,
// 	InputLabel,
// 	Select,
// 	MenuItem,
// 	Button,
// 	FormHelperText,
// 	ButtonGroup,
// } from "@material-ui/core";
// import useForm from "./useForm";
// import { useToasts } from "react-toast-notifications";
// import { initialFieldValues, columns } from "../catalog";
// import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
// import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

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

// const manageForm = ({ classes, ...props }) => {
// 	const { addToast } = useToasts();
// 	const validate = (fieldValues = values) => {
// 		let temp = { ...errors };
// 		columns.map((column) => {
// 			const property = column.field;
// 			if (column.isRequired && property in fieldValues) {
// 				temp[property] = fieldValues[property] ? "" : "Не заполнено.";
// 			}
// 		});
// 		setErrors({ ...temp });
// 		if (fieldValues === values) {
// 			return Object.values(temp).every((x) => x === "");
// 		}
// 	};

// 	const {
// 		values,
// 		setValues,
// 		errors,
// 		setErrors,
// 		handleInputChange,
// 		resetForm,
// 	} = useForm(initialFieldValues, validate, props.setCurrentId);

// 	const inputLabel = useRef(null);
// 	const [labelWidth, setLabelWidth] = useState(0);
// 	useEffect(() => {
// 		setLabelWidth(inputLabel.current.offsetWidth);
// 	}, []);

// 	const handleSubmit = () => {
// 		e.preventDefault();
// 		if (validate()) {
// 			const onSuccess = () => {
// 				resetForm();
// 				addToast("Успешно добавлено!", { appearance: "success" });
// 			};
// 			if (props.currentId == 0) {
// 				props.create(values, onSuccess);
// 			} else {
// 				props.update(props.currentId, values, onSuccess);
// 			}
// 		}
// 	};

// 	useEffect(() => {
// 		if (props.currentId != 0) {
// 			setValues({ ...props.rows.find((x) => x.id === props.currentId) });
// 		}
// 		setErrors({});
// 	}, [props.currentId]);

// 	return (
// 		<form
// 			autoComplete='off'
// 			noValidate
// 			className={classes.root}
// 			onSubmit={handleSubmit}>
// 			<Grid container>
// 				<Grid item xs={6}>
// 					{props.columns.map(() => {
// 						if (column.isRequired) {
// 							const property = column.field;
// 							return column.type !== "lookup" ? (
// 								<TextField
// 									name={property}
// 									variant='outlined'
// 									label={column.label}
// 									value={values[property]}
// 									type={column.type}
// 									onChange={handleInputChange}
// 									{...(errors[property] && {
// 										error: true,
// 										helperText: errors[property],
// 									})}
// 								/>
// 							) : (
// 								<FormControl
// 									variant='outlined'
// 									className={classes.formControl}
// 									{...(errors[property] && { error: true })}>
// 									<InputLabel ref={inputLabel}>{column.label}</InputLabel>
// 									<Select
// 										name={property}
// 										value={values[property]}
// 										onChange={handleInputChange}
// 										labelWidth={labelWidth}>
// 										<MenuItem value=''>Выберите:</MenuItem>
// 										{column.lookup.map((lookupRow) => {
// 											<MenuItem value={lookupRow.value}>
// 												{lookupRow.label}
// 											</MenuItem>;
// 										})}
// 									</Select>
// 									{errors[property] && (
// 										<FormHelperText>{errors[property]}</FormHelperText>
// 									)}
// 								</FormControl>
// 							);
// 						}
// 					})}
// 					<ButtonGroup>
// 						<Button
// 							variant='outlined'
// 							color='primary'
// 							type='submit'
// 							className={classes.smMargin}>
// 							<SaveOutlinedIcon color='primary' />
// 						</Button>
// 						<Button
// 							variant='outlined'
// 							color='primary'
// 							type='submit'
// 							className={classes.smMargin}>
// 							<CloseOutlinedIcon color='primary' />
// 						</Button>
// 					</ButtonGroup>
// 				</Grid>
// 			</Grid>
// 		</form>
// 	);
// };

// export default withStyles(styles)(manageForm);
