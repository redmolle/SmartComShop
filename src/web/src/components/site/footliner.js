import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function OverLine() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="overline"  align="center" gutterBottom>
        All Rights Reserved {getCurrentYear()} © 
      </Typography>
      
    </div>
  );
}
 const getCurrentYear = () =>  new Date().getFullYear();