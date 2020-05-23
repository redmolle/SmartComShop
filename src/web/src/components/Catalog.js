import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/Catalog';
import {Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, withStyles, ButtonGroup, Button } from '@material-ui/core';
import CatalogForm from './CatalogForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useToasts } from "react-toast-notifications";

const styles = theme =>({
    root: {
        "& .MuiTableCell-head":{
            fontSize: "1.25rem"
        }
    },
    paper :{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Catalog = ({classes, ...props}) => {
const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllCatalog()
    }, [])

    const { addToast } = useToasts()

    const onDelete = id => {
        if(window.confirm('Are you sure to delete this?'))
        props.deleteItem(id, () => {addToast("Deleted successfully", {appearance:'info'})}) //TODO не работает toast
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <CatalogForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className = {classes.root}>
                                <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.CatalogList.map((record,index)=>{
                                        return(<TableRow key={index} hover>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.category}</TableCell>
                                            <TableCell>{record.price}</TableCell>
                                            <TableCell>
                                                <ButtonGroup>
                                                    <Button>
                                                        <EditIcon
                                                            color="primary"
                                                            onClick={()=>{setCurrentId(record.id)}}
                                                        />
                                                    </Button>
                                                    <Button>
                                                        <DeleteIcon
                                                            color="secondary"
                                                            onClick={() => onDelete(record.id)}
                                                        />
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}


const mapStateToProps = state => ({
    CatalogList:state.Catalog.list
})

const mapActionToProps = {
    fetchAllCatalog: actions.FetchAll,
    deleteItem: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Catalog));