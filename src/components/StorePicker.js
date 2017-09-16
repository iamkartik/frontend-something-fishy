// each component should have a seperate file 
import React from 'react';

// React component created by extendind React.Component
class StorePicker extends React.Component{
    // essential to have a render method
    render(){
        // return jsx
        // return html inside () 
        // can only return one parent,multiple elements at same parent level will cause error
        return (
            // cannot use class for css, as it is a keyword in js
            // use className instead
            <form className="store-selector">
                <h2>Please Enter a Store</h2>
                 {/*cannot put comment over parent tag*/}
                 {/*all tags must be closed*/} 
                <input type="text" placeholder="Store Name" required/>
                <button type="submit">Visit Store</button>
            </form>
        );
    }
};
// exporting the entire class 
export default StorePicker;