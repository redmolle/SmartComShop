import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import useTable from "../use/useTable";
import useDialog from "../use/useDialog";
import PropTypes from "prop-types";
import DialogForm from './DialogForm'
import {
	TableFooter,
	TablePagination,
	FormControlLabel,
	Switch,
	TableRow,
	TableCell,
	Button,
	ButtonGroup,
	TableBody,
	Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputLabel,
    TextField,
    Select,
    MenuItem,
} from "@material-ui/core";
import EnhancedTableToolbar from "../EnhancedTable/EnhancedTableToolbar";
import EnhancedTableHead from "../EnhancedTable/EnhancedTableHead";
import EditIcon from "@material-ui/icons/Edit";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

const useManagerTable = ({ classes, ...props }) => {
	const [selected, setSelected] = useState([]);

    const [open, setOpen] = useState(false);
	const [currentId, setCurrentId] = useState(0)
	const {
		refreshRowsOnPage,

		pagination,
		setPagination,
		handleChangePage,
		handleChangePageSize,

		order,
		setOrder,
		handleRequestSort,

		orderBy,
		setOrderBy,

		dense,
		setDense,

		searchString,
		setSearchString,
		handleSearchChangeSimple,

		addToast,

		denseButton,
		footer,
        emptyStub,
    } = useTable({classes, ...props});
    

    const {setOpenDialog, dialog,handleOpenDialog} = useDialog({currentId, setCurrentId,...props})

    const refreshPage = () => {
        refreshRowsOnPage()
    }
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = props.rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const refreshSelected = () => {
		setSelected(selected.filter((s) => props.rows.some((n) => n.id === s)));
    };
    


	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleSearchChange = (search) => {
		handleSearchChangeSimple(search);
		refreshSelected();
	};

    const isSelected = (id) => selected.indexOf(id) !== -1;
    
    
    const onFail = (error) => {
        addToast(`Произошла ошибка ${error}`, { appearance: "error" })
    }
    const muteDelete = id => {
        props.deleteRow(
        id,
        () => {
            addToast(`Успешно удален элемент ${id}`, { appearance: "info" });
        }, (error) => onFail(error))
    };

	const onDeleteSelected = () => {
		if (selected.length === 1) {
			onDelete(selected[0]);
		} else if (
			window.confirm(`Уверны, что хотите удалить ${selected.length} элементов?`)
		) {
			selected.forEach((s) => muteDelete(s));
		}
	};

	const onDelete = (id) => {
        if (
			window.confirm("Уверены, что хотите удалить выбранный элемент?")
		) {
            muteDelete(id)
        }
    };
    
    const onEdit = (id) => {
        setCurrentId(id)
        handleOpenDialog()
    }
    

	const toolbar = (
		<EnhancedTableToolbar
			title={props.title}
			searchString={searchString}
			onSearchChange={handleSearchChange}
			numSelected={selected.length}
			onDelete={onDeleteSelected}
		/>
	);

	const head = (
		<EnhancedTableHead
			columns={props.columns}
			order={order}
			orderBy={orderBy}
			onRequestSort={handleRequestSort}
			numSelected={selected.length}
			rowCount={props.totalCount}
            onSelectAllClick={handleSelectAllClick}
            onAdd={() => onEdit(0)}
            dialog={dialog}
		/>
	);

	const body = (
		<TableBody>
			{props.rows.map((row, index) => {
				const isItemSelected = isSelected(row.id);
				const labelId = `enhanced-table-checkbox-${index}`;
				return (
					<TableRow
						hover
						role='checkbox'
						aria-checked={isItemSelected}
						tabIndex={-1}
						key={index}
						selected={isItemSelected}>
						<TableCell padding='checkbox'>
							<Checkbox
								checked={isItemSelected}
								onClick={(event) => handleClick(event, row.id)}
								inputProps={{ "aria-labelledby": labelId }}
							/>
						</TableCell>
						{props.columns.map((column) => {
							const value = row[column.field];
							const isId = column.id === "id";
							return (
								<TableCell
									key={column.id}
									align={column.align}
									component={isId ? "th" : column.component}
									id={isId ? labelId : column.id}
									scope={isId ? "row" : column.scope}
									padding={isId ? "none" : column.padding}>
									{column.format && typeof value === "number"
										? column.format(value)
										: value}
								</TableCell>
							);
						})}
						<TableCell>
							<ButtonGroup>
                                <DialogForm
                                    initialFieldValues={props.initialFieldValues}
                                    currentId={currentId}
                                    setCurrentId={setCurrentId}
                                    columns={props.columns}
                                    create={props.create}
                                    update={props.update}
                                    buttonIcon={<EditIcon />}
                                    open={open}
                                    setOpen={setOpen}
                                />
								<Button className={classes.button}>
									<DeleteIcon
										color='secondary'
										onClick={() => onDelete(row.id)}
									/>
								</Button>
							</ButtonGroup>
						</TableCell>
					</TableRow>
				);
			})}
            {emptyStub}
		</TableBody>
    );
    



    // const [openDialog, setOpenDialog] = useState(false)
    // const handleOpenDialog = event => {
    //     setOpenDialog(true)
    // }
    // const handleCloseDialog = event => {
    //     setOpenDialog(false)
    // }
    // const validate = (fields = values) => {
    //     let temp = {...errors}
    //     props.columns.map((column) => {
    //         const value = column.field
    //         if (column.isRequired && value in fields)
    //             if (column.type === "number")
    //                 temp[value] = typeof(fields[value]) === "number" ? "" : "Неверный формат"
    //             else
    //                 temp[value] = fields[value] ? "" : "Обязательное поле"
    //     })
    //     setErrors({...temp})
    //     if (fields === values)
    //         return Object.values(temp).every(x => x === "")
    // }



    // const {
    //     values,
    //     setValues,
    //     errors,
    //     setErrors,
    //     handleInputChange,
    //     resetForm,
    // } = useForm(props.initialValues, validate, setCurrentId)
    // // const inputLabel = React.useRef(null);
    // // const [labelWidth, setLabelWidth] = React.useState(0);
    // // React.useEffect(() => {
    // //     setLabelWidth(inputLabel.current.offsetWidth);
    // // }, []);

    // const handleSubmit = event => {
    //     event.preventDefault()
    //     if (validate()) {
    //         const onSuccess = () => {
    //             resetForm()
    //             addToast("Изменения успешно внесены!", {appearance:'success'})
    //         }
    //         if(currentId == 0)
    //             props.create(values, onSuccess, onFail)
    //         else
    //             props.update(currentId, values, onSuccess, onFail)
    //     }
    // }

    // // const inputLabel = React.useRef(null);
    // // const [labelWidth, setLabelWidth] = React.useState(0);
    // // React.useEffect(() => {
    // //     setLabelWidth(inputLabel.current.offsetWidth);
    // // }, []);

    // console.log(values)
    // console.log(errors)
 
    // useEffect(() => {
    //     if (props.currentId != 0) {
    //         setValues({
    //             ...props.rows.find(x => x.id == props.currentId)
    //         })
    //         setErrors({})
    //     }
    // }, [props.currentId])

    
	return {
		toolbar,
		head,
		body,
		footer,
        denseButton,
        dialog,
	};
};
useManagerTable.propTypes = {
	title: (PropTypes.string.isReqired = true),
	columns: (PropTypes.array.isRequired = true),
	rows: (PropTypes.array.isRequired = true),
	totalCount: (PropTypes.number.isRequired = true),
    deleteRow: (PropTypes.func.isRequired = true),
	setCurrentId: (PropTypes.func.isRequired = true),
	setOpenDialog: (PropTypes.func.isRequired = true),
}
export default useManagerTable;
