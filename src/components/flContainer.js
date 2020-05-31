import React, { Component } from 'react'
import withFLContext, {childrenWithDataProp, withOnLoad} from '../contexts/contextUtility'

class FLContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
    }
    componentWillMount() {
        //this.props.util.registerData(this.props.name, data);
        this.props.util.register(this.props.name, this.props.actions);
        //setInterval(() => console.log("container", this.state.data), 1000)
    }
    componentDidMount() {
        let get = this.props.actions.get;
        //setTimeout(() => fetch(get).then(res => res.json()).then(data => this.props.flOnLoad(data)), 2000);
        fetch(get).then(res => res.json()).then(data => this.props.flOnLoad(data))
    }

    render() {
        const childrenWithData = childrenWithDataProp(this.props.children, this.state.data);
        return (
            <div className="fl-api-container">
                {childrenWithData}
            </div>
        )   
    }
}

export default withFLContext(FLContainer);



