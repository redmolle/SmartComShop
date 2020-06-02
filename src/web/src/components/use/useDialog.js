import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import useTable from "../use/useTable";
import useForm from "../use/useForm";
import PropTypes from "prop-types";
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
const useDialog = ({classes, ...props}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [values, setValues] = useState(props.initialFieldValues)
    const [errors, setErrors] = useState({})
    
    console.log(values, errors, props.columns)
    const validate = (fields = values) => {
        let temp = {...errors}
        props.columns.map((column) => {
            const value = column.field
            if (column.isRequired && value in fields)
                if (column.type === "number")
                    temp[value] = typeof(fields[value]) === "number" ? "" : "Неверный формат"
                else
                    temp[value] = fields[value] ? "" : "Обязательное поле"
        })
        setErrors({...temp})
        if (fields === values)
            return Object.values(temp).every(x => x === "")
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const resetForm = () => {
        setValues({
            ...props.initialFieldValues
        })
        setErrors({})
        props.setCurrentId(0)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                props.addToast("Изменения успешно внесены!", {appearance:'success'})
            }
            if(props.currentId === 0)
                props.create(values, onSuccess, props.onFail)
            else
                props.update(props.currentId, values, onSuccess, props.onFail)
        }
    }
    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.rows.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])
    
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        props.setCurrentId(0)
        setOpenDialog(false)
    }
    
    const dialog = (
        <Dialog
			open={openDialog}
			onClose={handleCloseDialog}
			aria-labelledby="form-dialog-title"
            maxWidth="md"
            fullWidth
		>
			<DialogTitle id="from-dialog-title">
				{props.dialogTitle}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					testetstets
				</DialogContentText>
        {/* <TextField
          id="standard-name"
          label="Name"
          value={45}
          onChange={handleInputChange}
          margin="normal"
        /> */}
				{props.columns.map((column, index) => {
                    
            const field = column.field
            // console.log(index, column.field, column.type,column.label,values,values[field])
                    return (
                        <TextField
                            name={column.field}
                            id={index}
                            variant="outlet"
                            type={column.type}
                            label={column.label}
                            // value={values[field]}
                            // onChange={handleInputChange}
                            // {...(errors[field] && {error: true, helperText: errors.name})}
                        />) //: (<div>
                        //     <InputLabel >{/* ref={inputLabel}>}{column.field}</InputLabel>
                        //     <Select
                        //         name={column.field}
                        //         value={values[field]}
                        //         onChange={handleInputChange}
                        //         labelWidth={labelWidth}
                        //     >
                        //         <MenuItem value="">{column.label}:</MenuItem>
                        //         {column.lookup.map((l) =>{
                        //             return (
                        //                 <MenuItem value={l.value}>{l.label}</MenuItem>
                        //         )
                        //         })}
                        //     </Select></div>
                    })}
			</DialogContent>
				<DialogActions>
				<Button onClick={handleCloseDialog} color='secondary'>
					<CancelOutlinedIcon />
				</Button>
				<Button onClick={handleSubmit} color='primary'>
					<SaveOutlinedIcon />
				</Button>
				</DialogActions>
		</Dialog>
    )
    return {
        setOpenDialog,
        dialog,
        handleOpenDialog,
    };
}

export default useDialog;