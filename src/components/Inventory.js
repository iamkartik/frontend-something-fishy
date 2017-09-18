// the inventory component
import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    render(){
        return (
            <div>
                <h2>Inventory</h2>
                    {/*passing addFish method from app to AddFishForm,It is now inside props of Inventory*/}
                <AddFishForm addFish={ this.props.addFish }/>        
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
            );
    }
}

export default Inventory;