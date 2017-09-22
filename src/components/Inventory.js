// the inventory component
import React from 'react';
import AddFishForm from './AddFishForm';
// importing base to authenticate using firebase
import base from '../base';

class Inventory extends React.Component {
    
    constructor(){
        super();

        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid:null,
            owner:null
        }
    
    }
    // Life Cycle event runs once the component is mounted
    componentDidMount(){
        // once the component is loaded , firebase will try to authenticate automatically
        // check if ther is a user or not , re use authHandler to update state , which renders the page
        base.onAuth((user)=>{
           // check if user is there 
           if(user){
               // re use auth handler with the user object and null as error
               this.authHandler(null,{ user });
           }
        });
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
    // authenticate method to authenticate using firebase
    authenticate(provider){
        //console.log(`logging with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }
    // success callback from OAuth 
    authHandler(err, authData){
        if(err){
            console.error(err);
            return;
        }

        // grab the store info from firebase 
        // check if there is an owner , if not then set it as logged in user
        // else check if the logged in user and owner match each other
        
        const storeRef = base.database().ref(this.props.storeId);
        //query the ownerInfo from the storeRef
        storeRef.once('value',(snapshot)=>{
            // get the store data if it is there , else empty object
            const data = snapshot.val() || {};
           
            // if no data is there , then it's a new store
            // set the current logged in user as the owner
            if(!data.owner){
                storeRef.set({
                    owner:authData.user.uid
                });
            }
            // update the state with the auth data 
            // on refresh the user has to login again
            // using lifecycle event to prevent that
            this.setState({
                uid:authData.user.uid,
                owner:data.owner || authData.user.uid
            })

        });

    }

    logout(){
        base.unauth();
        this.setState({ uid:null });
    }

    // rendering a login 
    renderLogin(){
        return(
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign In to manage your store</p>
                <button className="google" onClick={()=>this.authenticate('google')}>
                    Log In with google</button>
                <button className="facebook" onClick={()=>this.authenticate('facebook')}>
                    Log In with facebook</button>
                <button className="github" onClick={()=>this.authenticate('github')}>
                    Log In with github</button>
            </nav>
        );
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
        // logout button 
        const logout = <button onClick={ ()=>this.logout() }>Log Out!</button>

        // storing the userId and app owner in state
        // check if anyone is logged in or not
        if(!this.state.uid){
            return <div>{ this.renderLogin() }</div>
        }
        // check if the logged in user is same as the current store
        if(this.state.uid !== this.state.owner){
            return(
                <div>
                    <p>Sorry You are not the owner of the store!</p>
                    { logout }
                </div>
            );
        }

        return (
            <div>
                <h2>Inventory</h2>
                { logout }
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


Inventory.propTypes ={
    addFish:React.PropTypes.func.isRequired,
    loadSamples:React.PropTypes.func.isRequired,
    fishes:React.PropTypes.object.isRequired,
    updateFish:React.PropTypes.func.isRequired,
    deleteFish:React.PropTypes.func.isRequired,
    storeId:React.PropTypes.string.isRequired
}

export default Inventory;