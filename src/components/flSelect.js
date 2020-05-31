import React, {Component} from 'react';
import {FLContext} from '../contexts/flContext';
import withFLContext from '../contexts/contextUtility';

class FLSelect extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        window.flinput = this.input;
        //this.input.current.value = this.props.initialValue;
        this.state = {
            initialValue : this.props.initialValue || "",
            userValue : this.props.initialValue || "",
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
            this.input.current.value = val;
        }
    }

    static getDerivedStateFromProps(props, state, test) {
        if (props.initialValue != state.initialValue) {
            //state.object.current.value = props.initialValue;
            state.updateRef(props.initialValue);
            props.util.handleDirty(false, props.apikey, props.initialValue)
            return {initialValue: props.initialValue, userValue: props.initialValue, dirty: false, lastDirtyState: false, error: false} || null 
        }
        return null;
    }

    testing() {
        console.log(this.props.util);
    }

    handleUpdate(e, noTrack) {
        if (!noTrack) {
            let wasDirty = this.state.dirty;
            let isDirty = !(this.state.initialValue == e.target.value);

            this.setState({
                userValue: e.target.value,
                lastDirtyState: wasDirty,
                dirty: isDirty
            })
            this.props.util.handleDirty(isDirty, this.props.apikey, e.target.value);
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
            <div className='fl-text-input fl-field-container' style={{display: 'inline-block'}}>
                <div>
                    <label onClick={() => this.testing()}>{this.props.label}</label><span style={{"display": this.state.dirty ? 'inline-block' : 'none', lineHeight: "1px"}}>*</span>
                </div>
                <select defaultValue={this.props.defaultValue} {...otherProps}  style={style} ref={this.input} onChange={(e) => this.handleUpdate(e)}> 
                    {this.props.options.map((x, i) => <option value={x.value} key={i}>{x.text}</option>)}
                </select>
            </div> 
        )
    }
}

// export default props => (
//     <FLContext.Consumer>
//         {(context) =>
//            <FLTextInput fl={context} {...props} />
//         }
//     </FLContext.Consumer>
// )
export default withFLContext(FLSelect);