import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/CatalogActions";
import {
	Grid,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	withStyles,
	ButtonGroup,
	Button,
} from "@material-ui/core";
import manageForm from "../Manage/manageForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirm, info } from "../../utils/ui";
import { columns } from '../catalog'

const styles = (theme) => ({
	root: {
		"& .MuiTableCell-head": {
			fontSize: "1.25rem",
		},
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
	},
});

const manageCatalog = ({ classes, ...props }) => {
	const [currentId, setCurrentId] = useState(0);
	useEffect(() => {
		props.fetch();
	}, []);

	const onDelete = (id) => {
		if (confirm("Уверены, что хотите удалить?")) {
			props.delete(id, () => info("Успешно удалено"));
		}
	};

	return (
		<Paper className={classes.paper} elevation={3}>
			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<TableContainer>
						<Table>
							<TableHead className={classes.root}>
								<TableRow>
									{classes.map((column) => {
										if (column.isVisible) {
											return <TableCell>{column.field}</TableCell>;
										}
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								{props.rows.map((row, index) => {
									<TableRow hover key={index}>
										{columns.map((column) => {
											if (column.isVisible) {
												return <TableCell>{rows[column.field]}</TableCell>;
											}
										})}
										<ButtonGroup>
											<Button>
												<EditIcon
													color='primary'
													onClick={() => {
														setCurrentId(row.id);
													}}
												/>
											</Button>
											<Button>
												<DeleteIcon
													color='secondary'
													onClick={() => {
														onDelete(row.id);
													}}
												/>
											</Button>
										</ButtonGroup>
									</TableRow>;
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Paper>
	);
};

const mapStateToProps = (state) => ({
	rows: state.CatalogReducer.list,
	totalCount: state.CatalogReducer.totalCount,
});

const mapActionToProps = {
	fetch: actions.EnhancedFetch,
	create: actions.Create,
	delete: actions.Delete,
	update: actions.Update,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(Catalog));
