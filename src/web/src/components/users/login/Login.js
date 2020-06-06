import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/UserActions";
import clsx from "clsx";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
// import CryptoJS from 'CryptoJS'
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
	Input,
	InputAdornment,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {setCookie, getCookie} from '../Cookie'

const styles = (theme) => ({
	root: {
		// display: "flex",
		flexWrap: "wrap",
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
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: "25ch",
	},
});

const initialFieldValues = {
	userName: "",
	password: "",
	showPassword: false,
};

const Login = ({ classes, ...props }) => {
	const [values, setValues] = useState(initialFieldValues);
	const [token, setToken] = useState("")
	const { addToast } = useToasts();
	const onFail = (err) => {
		addToast(err, { appearance: "error" });
	};
	const validate = () => {
		if (values.userName === "") {
			onFail("Имя пользователя не указано!");
			return false;
		} else if (values.password === "") {
			onFail("Пароль не указан!");
			return false;
		}
		return true;
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const MD5 = (value) => {
		var CryptoJS = require("crypto-js");
		return CryptoJS.MD5(value).toString();
	};

	const handleLogin = (event) => {
		if (validate()) {
			console.log(MD5(values.password));
			props.createToken(values.userName, MD5(values.password), onFail);
			console.log(props.Token)
			setCookie('token', props.Token)
		}
		console.log(getCookie('token'))
	};
	
	useEffect(() => {
		props.clearToken()
	}, [values])

	return (
		<form autoComplete='off' noValidate className={classes.root}>
			<Grid
				container
				spacing={0}
				direction='column'
				alignItems='center'
				justify='center'>
				<Grid item xs={6}>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel htmlFor='standard-adornment-userName'>
							Имя пользователя
						</InputLabel>
						<Input
							id='standard-adornment-userName'
							type='text'
							value={values.userName}
							onChange={handleChange("userName")}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel htmlFor='standard-adornment-password'>
							Пароль
						</InputLabel>
						<Input
							id='standard-adornment-password'
							type={values.showPassword ? "text" : "password"}
							value={values.password}
							onChange={handleChange("password")}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}>
										{values.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Grid>
				<Grid>
					<ButtonGroup>
						<IconButton>
							<VpnKeyOutlinedIcon
								color='primary'
								size='large'
								onClick={handleLogin}
							/>
						</IconButton>
					</ButtonGroup>
				</Grid>
			</Grid>
		</form>
	);
};

const mapStateToProps = (state) => ({
	Token: state.UserReducer.token,
});

const mapActionToProps = {
	createToken: actions.Token,
	clearToken: actions.Clear,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(Login));
