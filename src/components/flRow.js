import React, { Component } from 'react'
import withFLContext, {childrenWithDataProp} from '../contexts/contextUtility';


class FLRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
    }
    componentWillMount() {
        
        
        this.setState({data: this.props.data}) 
        //setInterval(() => console.log("row", this.props.data), 1000)
    }
    render() {
        let columns = (this.props.columns || 3);
        let style = {
            "display": "grid",
            "gridTemplateColumns": !this.props.minWidth ? `repeat(${columns}, 1fr)` : `repeat(auto-fit, minMax(${this.props.minWidth}, ${this.props.maxWidth || '1fr'})`,
            "gridGap": "1em",
            "margin": "10px 0"
        };
        const childrenWithData = childrenWithDataProp(this.props.children, this.props.data); 
        return (
            <div style={style}>
                {childrenWithData}
            </div>
        )
    }
}

export default withFLContext(FLRow);