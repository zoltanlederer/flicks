import React, { useContext } from "react";
import { Context } from "./Store";

const CoolComponent = () => {
  const [state, setState] = useContext(Context)

  return (
    <div>Cool Component
      {state.name}
    </div>
  )  
}
  

export default CoolComponent