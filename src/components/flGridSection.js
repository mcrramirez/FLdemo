import React, { Component } from 'react'
import withFLContext from '../contexts/contextUtility';


class FLGridSection extends Component {
    render() {
        let style = {
            "display": "grid",
        };
        if (this.props.gridTemplateColumns) {
            style["gridTemplateColumns"] = this.props.gridTemplateColumns;
        }
        if (this.props.gridTemplateRows) {
            style["gridTemplateRows"] = this.props.gridTemplateRows;
        }
        if (this.props.gridGap) {
            style["gridGap"] = this.props.gridGap;
        }

        return (
            <div style={style}>
                {this.props.children}
            </div>
        )
    }
}

export default withFLContext(FLGridSection);