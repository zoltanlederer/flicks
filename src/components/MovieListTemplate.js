import React, { useEffect, useRef, useState } from "react";
import { alphabeticSorting } from './Helpers'

const MovieListTemplate = ({ data }) => {  
  const [alphabeticOrder, setAlphabeticOrder] = useState(null)
  const alphabeticOrderRef = useRef()

  // Reset the alphabetic order
  useEffect(() => {
    console.log('RUN')
    console.log(alphabeticOrderRef.current)
    alphabeticOrderRef.current.readOnly = alphabeticOrderRef.current.indeterminate = true
    setAlphabeticOrder(null)
  }, [data])

  // Alphabetic Order Checkbox
  const handleAlpabeticOrder = (e) => {
    const checkbox = e.target
    setAlphabeticOrder(true)

    if (checkbox.readOnly) {
      checkbox.checked = checkbox.readOnly = false
      setAlphabeticOrder(false)
    } else if (!checkbox.checked) {
      checkbox.readOnly = checkbox.indeterminate = true
      setAlphabeticOrder(null)
    }
  }

  // Makes the list in Alphabetic Order
  const dataListing = alphabeticSorting(data, alphabeticOrder)

  const content = () => {
    return (      
      dataListing.map(result => (
        <li key={result.id}>{result.title}</li>
      ))
    )
  }

  return (
    <div>
      <form>
        <input 
          type='checkbox'          
          id='a-z' 
          name='a-z' 
          value='A-Z' 
          ref={alphabeticOrderRef} 
          onChange={handleAlpabeticOrder}
        />
        <label htmlFor='a-z'>A-Z</label>
      </form>
       {content()}
    </div>
  )
}

export default MovieListTemplate