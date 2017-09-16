import React from 'react';
// react can render to native or dom ,get dom to render on html page 
// only importing the render mehod from ReactDom
import { render } from 'react-dom';
// inport css to allow webpack to compile all
import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/App';

// tell the  render method to render which component and where
// StorePicker component is rendered on main div inside index.html
render(<App/>,document.querySelector('#main'));