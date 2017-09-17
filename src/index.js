import React from 'react';
// react can render to native or dom ,get dom to render on html page 
// only importing the render mehod from ReactDom
import { render } from 'react-dom';
// impoting functions from React Router(used for routing in a react app)
import { BrowserRouter, Match, Miss } from 'react-router';
// import css to allow webpack to compile all
import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';


// The root component , stateless functional
// according to the url it will show/hide components
const Root =()=>{
    return (
        <BrowserRouter>
            {/*wrapping matches inside a div as  React.Children.only expected to receive a single React element child.*/}
            <div>
                {/*if a route is default show the store picker component*/}
                <Match exactly pattern="/" component={StorePicker}/>
                {/*if a route pattern matches /store/... show the main App component*/}
                <Match pattern="/store/:storeId" component={App}/>
                {/*if all the matches fail then go to miss*/}
                <Miss component={NotFound}/>
            </div>
        </BrowserRouter>    
    );
};


// tell the  render method to render which component and where
render(<Root/>,document.querySelector('#main'));