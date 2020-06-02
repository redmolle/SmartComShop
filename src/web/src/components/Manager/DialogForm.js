import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import useForm from "../use/useForm";
import { useToasts } from "react-toast-notifications";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme =>({
    root:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230
    },
    smMargin:{
        margin: theme.spacing(1)
    }
})

const DialogForm = ({initialFieldValues, currentId, setCurrentId, rows, columns, create, update, buttonIcon, open, setOpen}) => {
    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Обязательное поле."
        if ('category' in fieldValues)
            temp.category = fieldValues.category ? "" : "Обязательное поле."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "Не верный формат."
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "Обязательное поле."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, setCurrentId)


    // const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (currentId === 0)
                {create(values, onSuccess)}
            else{
                update(currentId, values, onSuccess)}
        }
    }

    useEffect(() => {
        if(currentId !== 0)
        setValues({
            ...rows.find(x => x.id === currentId)
        })
        setErrors({})
    }, [currentId])

    console.log(currentId)

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={e => {e.stopPropagation(); setOpen(true)}}
            >
                {buttonIcon}
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    {columns.map((column, index) => 
                    column.type !== "lookup" ? (
                        <TextField
                            id={index}
                            label={column.label}
                            name={column.name}
                            value={values[column.field]}
                            onChange={handleInputChange}
                            {...(errors[column.field] && {error:true, helperText: errors[column.field]})}
                        />
                    ) : (
                        <FormControl
                            variant="outlined"
                            // className={classes.formControl}
                            {...(errors[column.field] && {error:true, helperText: errors[column.field]})}
                        >
                            <InputLabel >{column.label}</InputLabel>
                            <Select
                                id={index}
                                label={column.label}
                                name={column.name}
                                value={values[column.field]}
                                onChange={handleInputChange}
                                // labelWidth={labelWidth}
                            >
                                <MenuItem value="">Выберите:</MenuItem>
                                {column.lookup.map((l) => {
                                    return (
                                        <MenuItem value={l.value}>{l.label}</MenuItem>
                                    )
                                })}
                            </Select>
                            {errors[column.field] && <FormHelperText>errors[column.field]</FormHelperText>}
                            </FormControl>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={e => setOpen(false)}
                    >
                        <CancelOutlinedIcon/>
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        <SaveOutlinedIcon/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default (withStyles(styles)(DialogForm));

