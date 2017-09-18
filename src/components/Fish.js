import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component{
    render(){
        // getting this.props.details in a local variable for easy access
        const { details } = this.props;
        return(
            <li className="menu-fish">
                {/*accessing the details via details passed in props*/}
                <img src={ details.image } alt={ details.name }/>
                <h3 className="fish-name">
                    { details.name }
                    <span className="price">{ formatPrice(details.price) }</span>
                </h3>
                <p>{ details.desc }</p>
                <button>Add To Order</button>
            </li>
        );
    }
}

export default Fish;