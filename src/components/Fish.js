import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component{
    render(){
        // getting this.props.details in a local variable for easy access
        const { details , index } = this.props;
        // is the fish available to add to order
        const isAvailable = details.status === 'available';
        // button text according to isAvailable ,either Add to order/Sold out
        const buttonText = isAvailable?'Add To Order':'Sold Out!'
        return(
            <li className="menu-fish">
                {/*accessing the details via details passed in props*/}
                <img src={ details.image } alt={ details.name }/>
                <h3 className="fish-name">
                    { details.name }
                    <span className="price">{ formatPrice(details.price) }</span>
                </h3>
                <p>{ details.desc }</p>
                {/*disable the add to order button if unavailable*/}
                {/*cannot access key inside the component, pass it explicitly via another props (index)
                 the =>is there to ensure that addToOrder is not run on pageLoad*/}
                <button disabled={ !isAvailable } onClick={ () => this.props.addToOrder(index) }>
                    { buttonText }</button>
            </li>
        );
    }
}

export default Fish;