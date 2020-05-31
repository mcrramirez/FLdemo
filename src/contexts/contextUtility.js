import React from 'react';
import {FLContext} from './flContext';

const withFLContext = (Component) => {
    return (props) => ( 
        <FLContext.Consumer>
            {(context) => {
                return <Component {...props} util={context} />
            }}
        </FLContext.Consumer>
    ) 
}

export const withOnLoad = (Component) => {
    return (props) => (
        <Component {...props} flOnLoad={() => this.setState(data)} />
    )
}

export const childrenWithDataProp = (children, data) => {
    return React.Children.map(children, child => React.cloneElement(child, {data, data}));
}

export default withFLContext;
