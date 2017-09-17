// App component contains the main app 
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component{
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/*prop can provide attributes to a component ,provide data*/}
                    <Header tagline="Fresh SeaFood Market"/>
                </div>
                <Order/>
                <Inventory/>
            </div>
        );
    }
};

export default App;