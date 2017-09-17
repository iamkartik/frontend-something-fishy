// The Header Component
import React from 'react';

class Header extends React.Component{
    render(){
        // $r in console contains the selected component
        console.log(this);
        return (
        <header className="top">
            <h1>
                 <span className="ofThe">
                    Something 
                 </span>
                 Fishy
            </h1>
            {/*the props contain the attribute tagline provided in App.js*/}
            <h3 className="tagline"><span>{this.props.tagline}</span></h3>
        </header>);
    }
}

export default Header;