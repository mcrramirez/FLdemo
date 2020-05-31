import React, { Component } from "react";
import withFLContext, {
  childrenWithDataProp
} from "../contexts/contextUtility";

function FLRow2(props) {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         data:{}
  //     }
  // }
  const [state, setCount] = useState({ data: {} });
  //   function setCount() {
  //     return { data: props.data };
  //     //setInterval(() => console.log("row", this.props.data), 1000)
  //   }
  // render() {
  let columns = this.props.columns || 3;
  let style = {
    display: "grid",
    gridTemplateColumns: !props.minWidth
      ? `repeat(${columns}, 1fr)`
      : `repeat(auto-fit, minMax(${props.minWidth}, ${props.maxWidth ||
          "1fr"})`,
    gridGap: "1em",
    margin: "10px 0"
  };
  const childrenWithData = childrenWithDataProp(props.children, props.data);
  return <div style={style}>{childrenWithData}</div>;
  // }
}
export default withFLContext(FLRow2);
