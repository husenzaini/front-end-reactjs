import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import axios from "axios"; 
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const [products, setProducts] = React.useState([])
  const classes = useStyles();

useEffect(()=> {
    axios.get('http://localhost:4002/api/v1/product')
        .then(res => {
            setProducts(res.data.result.result)
        })
        .catch(err => {
            console.log(err)
        })
})
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {products.map((value, index) => (
            <Grid key={index} item>
              <Card key={index}product={value}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
