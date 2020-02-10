import React, { Component } from "react";
import axios from "axios"; 

class Product extends Component{
   constructor(props){
       super(props)
       this.state = {
           sembarang : 0
       }
   }

   componentDidMount (){
    axios.get('http://localhost:4002/api/v1/product')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}


   handlePlus(){
       this.setState((prevState, props)=> ({
           sembarang: prevState.sembarang + 1
       }))
   }
   
   handleMinus(){
    this.setState((prevState, props)=> ({
        sembarang: prevState.sembarang - 1
    }))
}

   
    render(){
        return(
            <div style = {{display: 'flex', justifyContent :'center', alignItems: 'center', height: '100vh'}}>
                ini state = {this.state.sembarang}
                <br/>
                <div>
                    <button onClick = {()=> (this.handlePlus())} style = {{backgroundColor : 'blue', color:'white', width:'90px', height: '90px'}}>+</button>
                    <button onClick = {()=> (this.handleMinus())} style = {{backgroundColor :'blue', color: 'white', width:'90px', height: '90px'}}>-</button>
                </div>
            </div>
        )
    }
}

export default Product;