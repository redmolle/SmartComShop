import React from "react";
import {
	Toolbar,
	Typography,
	Tooltip,
	IconButton,
	TextField,
} from "@material-ui/core";
import { lighten, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
	root: {
		".MuiToolbar-root": {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1),
		},
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: "1 1 40%",
	},
});

const EnhancedTableToolbar = ({ classes, ...props }) => {
	const {
		title,
		searchString,
		onSearchChange,
		numSelected,
		onDelete,
	} = props;

	const setSearchString = (searchString) => {
		onSearchChange(searchString);
	};

	const isEnhanced = () => numSelected && onDelete;

	return (
		<Toolbar className={classes.root}>
			{isEnhanced && numSelected > 0 ? (
				<Typography
					className={classes.title}
					color='inherit'
					variat='subtitle1'
					component='div'>
					{numSelected} выбрано
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant='h6'
					id='tableTitle'
					component='div'>
					{title}
				</Typography>
			)}
			<TextField
				name='search'
				variant='outlined'
				label='Поиск'
				fullWidth
				value={searchString}
				onChange={(event) => setSearchString(event.target.value)}
			/>
			{isEnhanced && numSelected > 0 ? (
				<Tooltip title='Удалить'>
					<IconButton aria-label='delete'>
						<DeleteIcon  onClick={onDelete}/>
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='Очитить поисковую строку'>
					<IconButton aria-label='filter label'>
						<FilterListIcon onClick={() => onSearchChange("")} />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	title: PropTypes.string.isRequired=true,
	searchString: PropTypes.string.isRequired=true,
	onSearchChange: PropTypes.func.isRequired=true,
	numSelected: PropTypes.number.isRequired=false,
	onDelete: PropTypes.func.isRequired=false,
};


export default (withStyles(styles)(EnhancedTableToolbar));
