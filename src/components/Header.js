// The Header Component
import React from 'react';

// if a component only renders DOM ,i.e only having one method , it can be converted to just a function
// they are called stateless functional component

    const Header = (props)=>{
        // $r in console contains the selected component
        return (
        <header className="top">
            <h1>
                 <span className="ofThe">
                    Something 
                 </span>
                 Fishy
            </h1>
            {/*the props contain the attribute tagline provided in App.js*/}
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>);
    }

// using PropTypes to validate data 
// specifying what kind of date is expected for tagline
// isRequired at the end tells React that this property is required
Header.propTypes = {
    tagline:React.PropTypes.string.isRequired
}


export default Header;