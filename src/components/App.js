// App component contains the main app 
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';


class App extends React.Component{
    // tell React what all states we need
    constructor(){
        super();
        // tell the types of objects that will be stored
        // getinitialState
        this.state={
            fishes:{},
            order:{}
        };
        // binding the add fish method to the App component
        this.addFish = this.addFish.bind(this);

        this.loadSamples = this.loadSamples.bind(this);
    }
    // addFish is a method to enable adding of fish in state 
    addFish(fish){
        // update the state
        // this.state.fishes.fish1=fish; // not best practice
        // best practice is to take a copy of current state , for performance and avoiding race condition
        // using spread to make copy of all the fishes stored in state
        const fishes = {...this.state.fishes};
        // add in the new fish
        // using the timestamp to ensure wach fish is unique
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // setting the state ie updating the fishes in state
        this.setState({ fishes:fishes });
        // passing down the addFish method to Inventory as props to enable addFish in AddFishForm component
    }

    // creating LoadSamples function to load sample data
    // It's created in App instead of Inventory as state is inside App component
    loadSamples(){
        this.setState({
            fishes:sampleFishes
        });
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/*prop can provide attributes to a component ,provide data*/}
                    <Header tagline="Fresh SeaFood Market"/>
                    <ul className="list-of-fishes">
                        { // using js to loop over the fishes object in state  
                         //using Object.keys to return all the keys inside the fishes object
                         // using map on the returned array to het the fish data   
                         Object
                            .keys(this.state.fishes)
                            // a unique key is required to ensure React can differntiate b/w diff fishes while updating
                            // passing the details to render out the fish
                            .map(key => <Fish key={ key } details={ this.state.fishes[key] }/>)
                         }
                    </ul>
                </div>
                <Order/>
                    {/*the add fish function is passed down as prop*/}
                <Inventory addFish={ this.addFish } loadSamples={ this.loadSamples }/>
            </div>
        );
    }
};

export default App;