import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';import { lighten, Toolbar, Typography, withStyles, TextField, Tooltip, ButtonGroup } from "@material-ui/core";
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import React from 'react'

const styles = (theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
      },
      highlight:
        theme.palette.type === 'light'
          ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
          : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
            },
			title: {
			  flex: '1 1 40%',
			},
			searchString: {
			  flex: '1 1 80%',
			},
});

const SmartToolbar = ({classes,setSelectedRows, ...props}) => {
	const handleClearClick = (event) => {
		setSelectedRows([])
	}
	return (
		<Toolbar className={classes.root}>
		{props.numSelected > 0 ? (
			<Typography
				className={classes.title}
				variant="subtitile1"
				component="div"
			>
				Выбрано строк: {props.numSelected}
			</Typography>
		) : (
			<Typography
				className={classes.title}
				variant='h6'
				id='tableTitle'
				component='div'
			>
				{props.title}
			</Typography>
		)}
			<TextField
				name='search'
				variant='outlined'
				label='Поиск'
				fullWidth
				className={classes.searchString}
				value={props.searchString}
				onChange={props.handleChangeSearchString}
				InputProps={{
					endAdornment: (
						<InputAdornment>
							<IconButton>
								<SearchOutlinedIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<ButtonGroup>
				<Tooltip title='Очитить поисковую строку'>
					<IconButton aria-label='filter label'>
						<FilterListOutlinedIcon onClick={handleClearClick} />
					</IconButton>
				</Tooltip>
				{props.children}
			</ButtonGroup>
		</Toolbar>
	);
};

export default withStyles(styles)(SmartToolbar)