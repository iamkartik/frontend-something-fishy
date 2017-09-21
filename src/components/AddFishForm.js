// the AddFishForm component
import React from 'react';
// React don't change the DOM change the State, React will update the DOM wherever necessary
// State is like a global object that stores the data , all components refer to that state data
class AddFishForm extends React.Component {
    createFish(e){
        e.preventDefault();
        const fish ={
            name:this.name.value,
            price:this.price.value,
            status:this.status.value,
            desc:this.desc.value,
            image:this.image.value
        }
        // saving the stae to App component
        // State always tied to a component,can be shared 
        // The State created in App as it has to be shared across the entire app
        // adding fish here will reflect on other parts as well
        // using addFish function created in App component (passed as a props via inventory) to add a fish to state
        this.props.addFish(fish);
        // resetting the form after adding fish
        this.fishForm.reset();
    }

    render(){
        return (
            <form className="fish-edit" ref={(input)=>this.fishForm=input} onSubmit={(e)=>this.createFish(e)}>
                <input ref={(input)=>this.name = input} type="text" placeholder="Fish Name" />
                <input ref={(input)=>this.price = input} type="text" placeholder="Fish Price"/>
                <select ref={(input)=>this.status = input}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input)=>this.desc = input} type="text" placeholder="Fish Description"/>
                <input ref={(input)=>this.image = input} type="text" placeholder="Fish Image"/>
                <button type="submit">Add Fish</button>
            </form>
        );
    }
}

AddFishForm.propTypes = {
    addFish:React.PropTypes.func.isRequired
}

export default AddFishForm;