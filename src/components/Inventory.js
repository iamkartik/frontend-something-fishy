// the inventory component
import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    
    constructor(){
        super();

        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e,key){    
        //debugger;
        const fish = this.props.fishes[key];
        // copy the updated fish in a new object using Object spread
        // event is required to get the target and updated value
        const updatedFish = {
            ...fish,
            // computing the property from event target (name,price,status) thus the name attr is req in input
            // using the spread to deconstruct fish and updating a particular field
            [e.target.name]:e.target.value
        }
        // sending the updated info to state in App
        this.props.updateFish(key,updatedFish);
    }

    renderInventory(key){
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={ key }>
                {/*only providing state info in input value will throw an error, 
                as input(HTML element) change can cause state to go out of sync 
                need to tell how to update the info ?
                inputs cannot be changed bnless we update the state*/} 
                <input type="text" name="name" value={ fish.name } placeholder="Fish Name" 
                    onChange={ (e)=>this.handleChange(e,key) }/>
                <input type="text" name="price" value={ fish.price } placeholder="Fish Price" 
                    onChange={ (e)=>this.handleChange(e,key) }/>
                <select name="status" value={ fish.status } placeholder="Fish Status" 
                    onChange={ (e)=>this.handleChange(e,key) }>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={ fish.desc } placeholder="Fish Description" 
                    onChange={ (e)=>this.handleChange(e,key) }/>
                <input type="text" name="image" value={ fish.image } placeholder="Fish Image" 
                    onChange={ (e)=>this.handleChange(e,key) }/>
                <button onClick={()=> this.props.deleteFish(key) }>Remove Fish</button>
            </div>
        );
    }

    render(){
        return (
            <div>
                <h2>Inventory</h2>
                {/*looping to display all the fish*/}
                { Object
                    .keys(this.props.fishes)
                    .map(this.renderInventory)
                }
                {/*passing addFish method from app to AddFishForm,It is now inside props of Inventory*/}
                <AddFishForm addFish={ this.props.addFish }/>        
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
            );
    }
}

export default Inventory;