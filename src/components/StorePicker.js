// each component should have a seperate file 
import React from 'react';
// imnporting fun names from helper
import { getFunName } from '../helpers'

// React component created by extendind React.Component
class StorePicker extends React.Component{
/*
    constructor(){
        super();
        // binding the go to store to the class
        // the method equals , the method bound to this(class)
        this.goToStore = this.goToStore.bind(this);
    }*/

    goToStore(e){
        e.preventDefault();
        // grab the text from text from input
        // instead of using the querySelectors to modify DOM , React uses ref to access elements
        // inside render this refers to the class , but inside other methods it is not by default
        // other methods are not implicitly bind to the class
        // to access this , bind the method inside the constructor or bind this to the event trigger inside render
        // now the input tag ref StoreInput can be accessed by this
            //console.log(this.storeInput.value)
        // now redirect to /store/:storeId    
        // either use a render <redirct> component or use transitionTo
        // parent Component is available to children (BrowserRouter)
        // to surface BrowserRouter use context (setting it at the end)
        this.context.router.transitionTo(`/store/${this.storeInput.value}`);

    }// es6 class no comma required


    // essential to have a render method
    render(){
        // return jsx
        // return html inside () 
        // can only return one parent,multiple elements at same parent level will cause error
        // react events put inline , not using selectores and adding events
        return (
            // cannot use class for css, as it is a keyword in js
            // use className instead
            // render method bound to class it is created ,thus this always refer to the class
            // binding  the goToStore  to class ,or use (e)=>this.goToStore(e)  
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                <h2>Please Enter a Store</h2>
                 {/*cannot put comment over parent tag*/}
                 {/*all tags must be closed*/}
                 {/*value attribute tied to state thus using defaultValue*/} 
                 {/*ref is a callback function ,once the element is rendered , it keeps a reference to it in react object ($r)*/} 
                <input type="text" placeholder="Store Name" required defaultValue={getFunName()} 
                    ref={(input)=>this.storeInput=input}/>
                <button type="submit">Visit Store</button>
            </form>
        );
    }
};
// setting the context for the StorePicker
StorePicker.contextTypes ={
    // tell react to make router from BrowserRouter available for the StorePicker
    router: React.PropTypes.object
};

// exporting the entire class 
export default StorePicker;