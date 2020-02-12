import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from "axios"; 
import EditProduct from './EditProduct';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';

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

 function SpacingGrid({allProducts}) {
  console.log(allProducts) 
  const [spacing] = React.useState(2);
  const [products, setProducts] = React.useState([])
  const classes = useStyles();

// useEffect(()=> {
//     axios.get('http://localhost:4002/api/v1/product')
//         .then(res => {
//             setProducts(res.data.result.result)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })
  return (
    <Box mt={5} ml={8}>
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {products.map((value, index) => (
            <Grid key={index} item>
              <EditProduct key={index}product={value}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
          </Box>
  );
}

const mapStateToProps = state => {
  const { products } = state
  return {
    allProducts: products.allProducts
  }
}
export default connect(mapStateToProps)(SpacingGrid)