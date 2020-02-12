import React from 'react';
import GridCard from '../container/GridCard';
import AddProduct from '../container/AddProduct';

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sembarang : 0
        }
    }
    render(){
        return(
            <div>
            
            <AddProduct/>
            <GridCard />
            </div>
        )
    }
}

export default Home;