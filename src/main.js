import React from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";
import {FlProvider} from './contexts/flContext';


document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <FlProvider><Counter Contact={{Fname_nm: "tony"}} Other={{}} /></FlProvider>,
    document.getElementById("mount")
  );

 
});
