import React, {Component} from 'react';
import {FLContext} from '../contexts/flContext';
import withFLContext from '../contexts/contextUtility';

class FLCheckbox extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        //this.input.current.value = this.props.initialValue;
        this.state = {
            initialValue : this.props.initialValue || 0,
            userValue : this.props.initialValue || 0,
            dirty : false,
            lastDirtyState : false,
            error: false,
            object: this.input,
            updateRef: (val) => this.updateRef(val)
        };
        
        
        
        this.testing = this.testing.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateRef = this.updateRef.bind(this);
    }

    updateRef(val) {
        if (this.input.current) {
            this.input.current.checked = (val == "1" ? true : false)
        }
    }

    static getDerivedStateFromProps(props, state, test) {
        if (props.initialValue != state.initialValue) {
            //state.object.current.value = props.initialValue;
            state.updateRef(props.initialValue || 0);
            props.util.handleDirty(false, props.apikey, props.initialValue)
            return {initialValue: props.initialValue, userValue: props.initialValue, dirty: false, lastDirtyState: false, error: false} || null 
        }
        return null;
    }

    testing() {
        //console.log(this.props.util);
    }

    handleUpdate(e, noTrack) {
        if (!noTrack) {
            let wasDirty = this.state.dirty;
            let isDirty = !(this.state.initialValue == (e.target.checked ? 1 : 0));

            this.setState({
                userValue: (e.target.checked ? 1 : 0),
                lastDirtyState: wasDirty,
                dirty: isDirty
            })
            this.props.util.handleDirty(isDirty, this.props.apikey, (e.target.checked ? 1 : 0));
        } else {
            this.setState({
                userValue: e,
                initialValue: e
            })
        }
    }

    render() {
        let style = {
            "width": "100%",
        };
        let {initialValue, ...otherProps} = this.props;
        return (
            <div className='fl-text-input fl-field-container' style={{display: 'inline-block', position: "relative"}}>
                <label style={{display: "line-block"}}>{this.props.label}</label><span style={{"display": this.state.dirty ? 'inline-block' : 'none', lineHeight: "1px"}}>*</span>
                <label className="chk-container" onClick={() => this.testing()}>
                    <input type="checkbox" {...otherProps} style={style} ref={this.input} onClick={(e) => this.handleUpdate(e)} /> 
                    <span className="checkmark"></span>
                </label>
            </div> 
        )
    }
}

// export default props => (
//     <FLContext.Consumer>
//         {(context) =>
//            <FLCheckbox fl={context} {...props} />
//         }
//     </FLContext.Consumer>
// )
export default withFLContext(FLCheckbox);