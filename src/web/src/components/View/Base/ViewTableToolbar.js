import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { lighten, Toolbar, Typography, withStyles, TextField, Tooltip } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
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
        flex: '1 1 100%',
      },
});

const ViewTableToolbar = ({
	classes,
	title,
	searchString,
	handleChangeSearchString,
	...props
}) => {
	return (
		<Toolbar className={classes.root}>
			<Typography
				className={classes.title}
				variant='h6'
				id='tableTitle'
				component='div'>
				{title}
			</Typography>
			<TextField
				name='search'
				variant='outlined'
				label='Поиск'
				fullWidth
				value={searchString}
				onChange={handleChangeSearchString}
				InputProps={{
					endAdornment: (
						<InputAdornment>
							<IconButton>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			{searchString && (
				<Tooltip title='Очитить поисковую строку'>
					<IconButton aria-label='filter label'>
						<FilterListIcon onClick={handleChangeSearchString} />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

export default withStyles(styles)(ViewTableToolbar)