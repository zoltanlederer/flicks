import React, { useState, useContext, useEffect } from "react";
import { alphabeticSorting } from '../utils/helpers'
import { GlobalStateContext } from '../states/GlobalStates'

// ascending descending default

const Filters = () => {
  const {dataAPI, setDataAPI} = useContext(GlobalStateContext)
  const [data, setData] = dataAPI
  const [alphabeticOrder, setAlphabeticOrder] = useState('default')

  const [dataFiltered, setDataFiltered] = useState([...data])
  // const dataOriginalOrder = JSON.parse(JSON.stringify(data));
  // const dataOriginalOrder = [...data];
  // useEffect(() => {
  //   setDataOriginalOrder([...data])
  //   // dataOriginalOrder = JSON.parse(JSON.stringify(data));
  // }, [])
  
  console.log('data', data)
  console.log('dataFiltered', dataFiltered)

  // Alphabetic Order Checkbox
  const handleAlpabeticOrder = (e) => {
    // const dataListing = alphabeticSorting(data, alphabeticOrder)
    const checkbox = e.target
    console.log(checkbox.dataset.sorted)
 
    if (checkbox.dataset.sorted === 'ascending'){
      checkbox.checked = true
      setAlphabeticOrder('descending')
      // setData(dataListing)
    }
    if (checkbox.dataset.sorted === 'descending'){
      checkbox.checked = false
      setAlphabeticOrder('default')
      // setData(dataListing)
    }
    if (checkbox.dataset.sorted === 'default'){
      checkbox.checked = false
      checkbox.indeterminate = true
      setAlphabeticOrder('ascending')
      // setData(dataOriginalOrder)
    }

    const dataListing = alphabeticSorting(data, dataFiltered, alphabeticOrder)
    setDataFiltered(dataListing)
  }

  // Alphabetic Order Checkbox
  // const handleAlpabeticOrder = (e) => {
  //   const dataListing = alphabeticSorting(data, alphabeticOrder)
  //   const checkbox = e.target
  //   setAlphabeticOrder(true)

  //   if (checkbox.readOnly) {
  //     checkbox.checked = checkbox.readOnly = false
  //     setAlphabeticOrder(false)
  //     // setData(dataListing)
  //   }
  //   //  else if (!checkbox.checked) {
  //   //   checkbox.readOnly = checkbox.indeterminate = true
  //     // setAlphabeticOrder(null)
  //     // setData(dataOriginalOrder)
  //   // } else {
      
  //   // }

  //   setData(dataListing)
  // }


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


  // const handleAlpabeticOrder = (e) => {
  //   const dataListing = alphabeticSorting(data, alphabeticOrder)
  //   const checkbox = e.target
 
  //   if (checkbox.checked){
  //     setAlphabeticOrder(true)
  //     setData(dataListing)
  //   }
  //   if (!checkbox.checked){
  //     setAlphabeticOrder(false)
  //     setData(dataListing)
  //   }
  // }