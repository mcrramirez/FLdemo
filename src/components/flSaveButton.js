import React, { Component } from "react";
import { FLContext } from "../contexts/flContext";
import withFLContext from "../contexts/contextUtility";

class FLSaveButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.util.execSave(this.props.container)}>
          {this.props.text || "Saves"}
        </button>
      </div>
    );
  }
}

// export default props => (
//     <FLContext.Consumer>
//         {(context) =>
//             <FLSaveButton fl={context}>Save</FLSaveButton>
//         }
//     </FLContext.Consumer>
// )
export default withFLContext(FLSaveButton);
