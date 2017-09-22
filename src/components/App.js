// App component contains the main app 
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import base from '../base';
import sampleFishes from '../sample-fishes';


class App extends React.Component{
    // tell React what all states we need
    constructor(){
        super();
        // tell the types of objects that will be stored
        // getinitialState
        this.state={
            // fishes synced to firebase and order to localstorage
            fishes:{},
            order:{}
        };
        // binding the add fish method to the App component
        this.addFish = this.addFish.bind(this);

        this.loadSamples = this.loadSamples.bind(this);

        this.addToOrder = this.addToOrder.bind(this);

        this.updateFish = this.updateFish.bind(this);

        this.deleteFish = this.deleteFish.bind(this);

         this.removeFromOrder = this.removeFromOrder.bind(this);
    }

    // component will mount is a special method that runs during the component life cycle 
    // hooking to sync our data with firebase before the component is renderd
    // it is used in React component life cycle
    // https://facebook.github.io/react/docs/react-component.html
    componentWillMount(){
        // params in props contains the pathname and location 
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
        {   // passing the context and which state to sync
            context:this,
            state:'fishes'
        });

        // check if any order in localStorage , if present then load it
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localStorageRef){
            // update App component state
            this.setState({
                order:JSON.parse(localStorageRef)
            });
        }
    }
    // the function which runs after the component is removed
    componentWillUnMount(){
        // to ensure that sync does not happen once we close the component and go to other store
        base.removeBinding(this.ref);        
    }

    // adding another life cycle method , componentWillUpdate
    // whwnever a prop or state changes this method will run
     componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order));
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

    updateFish(key,updatedFish){
    
        // copy of state
        const fishes = {...this.state.fishes};
        // update to the updated fish
        fishes[key]=updatedFish;
        // update state
        this.setState({ fishes });               
       // debugger;
    }

    deleteFish(key){
        // copy of fishes
        const fishes = {...this.state.fishes};
        // delete the fish , setting it null to delete in firebase
        fishes[key] = null;
        // update state
        this.setState({fishes});
    }

    // creating LoadSamples function to load sample data
    // It's created in App instead of Inventory as state is inside App component
    loadSamples(){
        this.setState({
            fishes:sampleFishes
        });
    }

    // add to order to add fishes to order
    addToOrder(key){
        // take copy of the state
        const order = {...this.state.order};
        order[key] = order[key]+1 || 1;
        // update the state
        this.setState({ order:order });
    }

    removeFromOrder(key){
        // copy of order state
        const order = {...this.state.order};
        //remove from order 
        delete order[key];
        // update state
        this.setState({order});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/*prop can provide attributes to a component ,provide data*/}
                    <Header tagline="Fresh SeaFood"/>
                    <ul className="list-of-fishes">
                        { // using js to loop over the fishes object in state  
                         //using Object.keys to return all the keys inside the fishes object
                         // using map on the returned array to het the fish data   
                         Object
                            .keys(this.state.fishes)
                            // a unique key is required to ensure React can differntiate b/w diff fishes while updating
                            // passing the details to render out the fish
                            // passing the add to order function to add a fish to order
                            // passing key as a props(index) as key cannot be accessed inside Fish
                            .map(key => <Fish key={ key } index={ key } details={ this.state.fishes[key] } 
                            addToOrder={this.addToOrder}/>)
                         }
                    </ul>
                </div>
                <Order fishes={ this.state.fishes } order={ this.state.order }
                    removeFromOrder={ this.removeFromOrder }/>
                    {/*the add fish function is passed down as prop*/}
                <Inventory addFish={ this.addFish } loadSamples={ this.loadSamples } 
                    fishes={ this.state.fishes } updateFish={ this.updateFish }
                    deleteFish={ this.deleteFish } storeId={ this.props.params.storeId }/>
            </div>
        );
    }
};

App.propTypes = {
    params:React.PropTypes.object.isRequired
}

export default App;