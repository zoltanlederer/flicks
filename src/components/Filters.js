import React, { useState, useContext } from "react";
import { alphabeticSorting } from '../utils/helpers'
import { GlobalStateContext } from '../states/GlobalStates'

const Filters = () => {
  const {dataAPI, setDataAPI} = useContext(GlobalStateContext)
  const [data, setData] = dataAPI
  const [alphabeticOrder, setAlphabeticOrder] = useState(null)
  
  // Alphabetic Order Checkbox
  const handleAlpabeticOrder = (e) => {
    const checkbox = e.target
 
    if (checkbox.checked){
      setAlphabeticOrder(true)
    }
    if (!checkbox.checked){
      setAlphabeticOrder(false)
    }

    const dataListing = alphabeticSorting(data, alphabeticOrder)
    setData(dataListing)
  }


  return (
    <div>
      Filters
      <form>
        <input 
          type='checkbox'          
          id='a-z' 
          name='a-z' 
          value='A-Z'
          data-sorted={alphabeticOrder}
          onChange={handleAlpabeticOrder}
        />
        <label htmlFor='a-z'>A-Z</label>
      </form>
    </div>
  )
}

export default Filters