import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import OpenRight from './OpenRight';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import { Box } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [values, setValues] = React.useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    id_category: 1
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const postProduct = () => {
    axios.post('http://localhost:4002/api/v1/product', values)
    .then(res => {
      console.log(res.data.result)
    })
    .catch(err => {
        console.log(err)
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
  
    axios.get('http://localhost:4002/api/v1/category')
    .then(res => {
      setCategories(res.data.result)
    })
    .catch(err => {
        console.log(err)
    })
    
  }
    
  )

  return (
    <div>
      <OpenRight openDialog={handleClickOpen}/>  
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Product
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose, postProduct}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Box mt={3}>
        <FormControl fullWidth className={classes.margin} >
        <TextField id="standard-basic" label="Name" value={values.name}
            onChange={handleChange('name')}/>
        </FormControl> 
        <FormControl fullWidth className={classes.margin} >
        <TextField id="standard-basic" label="Description" value={values.description}
            onChange={handleChange('description')} />
        </FormControl> 
        <FormControl fullWidth className={classes.margin} >
        <TextField id="standard-basic" label="Price" value={values.price}
            onChange={handleChange('price')} />
        </FormControl> 
        <FormControl fullWidth className={classes.margin} >
        <TextField id="standard-basic" label="Stock" value={values.stock}
            onChange={handleChange('stock')}/>
        </FormControl> 
        <FormControl fullWidth className={classes.margin} >
            <Button
            variant="contained"
            component="label"
            color="primary"
            >
              Upload Image
              <input
              type="file"
              style={{ display: "none" }}
              />
              </Button>
        </FormControl> 
        <FormControl fullWidth className={classes.margin}>
        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
          value={values.id_category}
            onChange={handleChange('id_category')}
        >
          {categories.map((el, index)=>(
            <MenuItem value={el.id} key={index}>
            {el.name}
            </MenuItem>
          ))}
        </Select>      
      </FormControl>
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}
