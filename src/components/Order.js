// the order component
import React from 'react';
import { formatPrice } from '../helpers'

class Order extends React.Component{   
    constructor(){
        super();

        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder(key){
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // fish deleted from inventory or unavailable
        if(!fish || !fish.status==='available'){
            // key is required in li to tell react which li to access
            return <li key={ key }> Sorry,{ fish?fish.name:'fish'} is no longer available!</li>; 
        }

        return (
            <li key={ key }>
               <span>{ count }kgs { fish.name }</span>     
               <span className="price">{ formatPrice(count*fish.price) }</span>
            </li> 
        );
    }

    // cannot return empty , either null or jsx
    render(){
        // all the fishes in order
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce(( prevTotal,key )=>{
            const fish = this.props.fishes[key];
            const number = this.props.order[key];
            // check for availability before adding the price
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable){
                const value =  (number * fish.price || 0);
                prevTotal += value;
            }
            return prevTotal;
        },0);

        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                    {/*offloading the fish display to another render function*/}
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        { formatPrice(total) }
                    </li>
                </ul>
            </div>
        );
    }
}

export default Order;