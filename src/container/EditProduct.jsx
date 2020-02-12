import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from './Card';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


export default function FormDialog({ product }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    id_category: 1
  });
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const patchProduct = () => {
    axios.patch('http://localhost:4002/api/v1/product/'+product.id, values, {
        headers:{
            "Access-Control-Allow-Origin": "PUT"
        }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
  }
  const deleteProduct = () => {
      axios.delete('http://localhost:4002/api/v1/product/'+product.id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
          console.log(err)
      })
  }
  const handleClickOpenConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card product={product} clickOpen={handleClickOpen} clickConfirmDelete={handleClickOpenConfirmDelete}/>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"            
            fullWidth
            value={values.name}
            onChange={handleChange('name')}/>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"           
            fullWidth
            value={values.description}
            onChange={handleChange('description')}/>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"         
            fullWidth
            value={values.price}
            onChange={handleChange('price')}/>
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"
            fullWidth
            value={values.stock}
            onChange={handleChange('stock')}/>
          <InputLabel id="demo-simple-select-autowidth-label">category</InputLabel>
          <Select fullWidth value={values.id_category}
            onChange={handleChange('id_category')}>
            <MenuItem value={1}>
            food
            </MenuItem>
            <MenuItem value={2}>
            drink
            </MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleClose();patchProduct()}} color="primary">
            Edit 
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDelete}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Are you sure to delete the product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This process can't be recovered
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseConfirmDelete} color="primary">
            No
          </Button>
          <Button onClick={()=>{handleCloseConfirmDelete(); deleteProduct()}} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}