import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   // let buttonClass = "button";

   // //So, we'll update our Button component to create a variable buttonClass that stores a string that has the base class (button). When props.confirm is true we append a space and the button--confirm class to the buttonClass string.
   // if (props.confirm) {
   //    buttonClass += " button--confirm";
   // }

   // //We could extend this by adding support for props.danger. Usually, we would use either confirm or danger - only one or the other. It is not expected to have both props applied.
   // if (props.danger) {
   //    buttonClass += " button--danger";
   // }

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}