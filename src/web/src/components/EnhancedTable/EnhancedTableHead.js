import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ButtonGroup, Button } from "@material-ui/core";import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const styles = () => ({
	root: {
		".MuiTableHead-root": {
			width: "100%",
		},
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
});
const EnhancedTableHead = ({ classes, ...props }) => {
	const {
		columns,
		order,
		orderBy,
		onRequestSort,
		numSelected,
		rowCount,
		onSelectAllClick,
		onAdd,
	} = props;

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	const isEnhanced = () => numSelected && rowCount && onSelectAllClick;
	
	return (
		<TableHead className={classes.root}>
			<TableRow>
				{isEnhanced && (
					<TableCell padding='checkbox'>
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{ "aria-label": "Выбрать все" }}
						/>
					</TableCell>
				)}
				{columns.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc"
										? "Отсортированно по убыванию"
										: "Отсортированно по возрастанию"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell align="center">
					<ButtonGroup>
						<div>
						<Button className={classes.button} onClick={onAdd}>
							<AddCircleOutlineOutlinedIcon/>
						</Button>
						{props.dialog}
						</div>
					</ButtonGroup>
				</TableCell>
			</TableRow>
		</TableHead>
	);
};

EnhancedTableHead.propTypes = {
	columns: (PropTypes.array.isReqired = true),
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: (PropTypes.string.isRequired = true),
	onRequestSort: (PropTypes.func.isRequired = true),
	numSelected: (PropTypes.number.isRequired = false),
	onSelectAllClick: (PropTypes.func.isRequired = false),
	rowCount: (PropTypes.number.isRequired = false),
};

export default withStyles(styles)(EnhancedTableHead);
