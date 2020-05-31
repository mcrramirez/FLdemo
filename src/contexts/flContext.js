import React, { Component } from "react";
export const FLContext = React.createContext();
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current FLContext (with "" as the default).
export class FlProvider extends Component {
  constructor(props) {
    super(props);
    this.testing = {};
    this.state = {
      data: {},
      registerData: (name, data) => {
        let currData = Object.assign({}, this.state.data);
        if (!currData[name]) {
          let contData = Object.assign({}, currData[name]);
          let newData = Object.assign({}, contData, data);
          currData[name] = newData;
          this.setState({ data: currData });
          setTimeout(() => console.log(name, this.state.data), 1000);
        } else {
          currData[name] = data;
          this.setState({ data: currData });
        }
      },
      handleDirty: (a, b, c) => this.handleDirty(a, b, c),
      getDirtyCount: container => {
        let cont = this.state.containers[container];
        let keys;
        if (cont.dirtyFields) {
          keys = Object.keys(this.state.containers[container].dirtyFields);
        } else {
          return 0;
        }
        return keys ? keys.length : 0;
      },
      execSave: container => {
        if (container) {
          var dirty = this.state.getDirtyCount(container);
          if (dirty != 0) {
            console.log(
              container,
              this.state.containers[container].actions.save,
              JSON.stringify(this.state.containers[container].dirtyFields)
            );
          }
        } else {
          let keys = Object.keys(this.state.containers);
          for (let i = 0; i < keys.length; i++) {
            var dirty = this.state.getDirtyCount(keys[i]);
            if (dirty != 0) {
              let container = this.state.containers[keys[i]];
              console.log(
                keys[i],
                container.actions.save,
                JSON.stringify(container.dirtyFields)
              );
            }
          }
        }
      },
      containers: {},
      register: (name, actions) => {
        let newContainer = {
          name: name,
          actions: actions,
          dirtyFields: {},
          data: {}
        };
        this.state.containers[name] = newContainer;
      }
    };

    this.handleDirty = this.handleDirty.bind(this);
  }

  handleDirty(isDirty, key, val) {
    let keys = key.split(".");
    let apikey = keys[keys.length - 1];
    let container = keys[0];
    if (isDirty) {
      let containers = Object.assign({}, this.state.containers);
      containers[container].dirtyFields[apikey] = val;
      this.setState({ containers: containers });
    } else {
      let containers = Object.assign({}, this.state.containers);
      delete containers[container].dirtyFields[apikey];

      this.setState({ containers: containers });
    }
  }
  // Use a Provider to pass the current FLContext to the tree below.
  // Any component can read it, no matter how deep it is.
  // In this example, we're passing "this.state" as the current value.
  render() {
    const { children } = this.props;
    return (
      <FLContext.Provider value={this.state}>{children}</FLContext.Provider>
    );
  }
}

export const FlConsumer = FLContext.Consumer;
