import React, {useState, useEffect} from 'react'
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@material-ui/core'
import useForm from './useForm'
import { connect } from 'react-redux';
import * as actions from '../actions/Catalog';
import { useToasts } from "react-toast-notifications";

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

const initialFieldValues = {
    name: '',
    category: '',
    code: '',
    price: 100
}

const CatalogForm = ({classes, ...props}) => {
    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('category' in fieldValues)
            temp.category = fieldValues.category ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "Price is not valid."
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)


    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                {props.createItem(values, onSuccess)}
            else{
                props.updateItem(props.currentId, values, onSuccess)}
        }
    }

    useEffect(() => {
        if(props.currentId != 0)
        setValues({
            ...props.CatalogList.find(x => x.id == props.currentId)
        })
        setErrors({})
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        {...(errors.category && {error:true})}>
                        <InputLabel ref={inputLabel}>Category</InputLabel>
                        <Select
                            name="category"
                            value={values.category}
                            onChange={handleInputChange}
                            lableWidth={labelWidth}
                        >
                            //TODO начитать из бд
                            <MenuItem value="">Select Category</MenuItem>
                            <MenuItem value="Car">Авто</MenuItem>
                            <MenuItem value="Moto">Мото транспорт</MenuItem>
                            <MenuItem value="Water">Водный транспорт</MenuItem>
                        </Select>
                        {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                    </FormControl>
                    <TextField
                        name="price"
                        variant="outlined"
                        type="number"
                        label="Price"
                        value={Number(values.price)}
                        onChange={handleInputChange}
                        {...(errors.price && { error: true, helperText: errors.price })}
                    />
                    <TextField
                        name="code"
                        variant="outlined"
                        label="Code"
                        value={values.code}
                        onChange={handleInputChange}
                        {...(errors.code && { error: true, helperText: errors.code })}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    CatalogList: state.Catalog.list
})


const mapActionToProps = {
    createItem: actions.Create,
    updateItem: actions.Update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CatalogForm));