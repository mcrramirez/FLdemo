import React, { Component, useState } from "react";
import withFLContext from "../contexts/contextUtility";

function MessageButton() {
  const [count, handleIncrement] = useState(0);

  function getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += { count } === 0 ? "warning" : "primary";
    return classes;
  }
  return (
    <React.Fragment>
      <span className={getBadgeClasses()}>{count === 0 ? "Zero" : count}</span>
      <button
        onClick={() => handleIncrement(count + 1)}
        className="btn btn-secondary btn-sm"
      >
        Increment
      </button>
      <p>{React.version}</p>
    </React.Fragment>
  );
}

export default withFLContext(MessageButton);
