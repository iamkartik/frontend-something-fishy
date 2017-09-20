// the order component
import React from 'react';
import { formatPrice } from '../helpers'
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component{   
    constructor(){
        super();

        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder(key){
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // delete from order button 
        const removeButton = <button onClick={()=>this.props.removeFromOrder(key)}>&times;</button>;
        // fish deleted from inventory or unavailable
        if(!fish || fish.status==='unavailable'){
            // key is required in li to tell react which li to access
            return <li key={ key }> Sorry,{ fish?fish.name:'fish'} is no longer available! {removeButton}</li>; 
        }

        return (
            <li key={ key }>
               <span>
                   <CSSTransitionGroup
                   className="count"
                   component="span"
                   transitionName="count"
                   transitionEnterTimeout={250}
                   transitionLeaveTimeout={250}>
                       {/*key to remove the old span once the count is updated*/}
                      <span key={ count }>{ count }</span>
                   </CSSTransitionGroup>
                   kgs { fish.name } {removeButton}
                </span>     
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
                {/*replacing the ul with CSSTransitionGroup, giving it the property(component) of ul*/} 
                <CSSTransitionGroup 
                    className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {/*offloading the fish display to another render function*/}
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        { formatPrice(total) }
                    </li>
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default Order;