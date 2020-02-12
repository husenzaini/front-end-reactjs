import axios from 'axios';
import getAllProduct from '../actionsType';
const initialState= {
    allproduct:[]
}

export default function(state=initialState, action){
    if (action.type === GET_ALL_PRODUCTS){
        axios.get('http://localhost:4002/api/v1/product')
        .then(res => {
            state.allproduct=res.data.result.result
            return{
                ...state
            }
        })
        .catch(err => {
            console.log(err)
         })   
    }
    return state 
}