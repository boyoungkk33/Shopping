import React from 'react'

const RadioBox = ({prices, checkPrice, onFilters}) => {
  return (
   <div className='p-2 mb-3 bg-gray-100 rounded-md'>
    {prices?.map(price =>(
      <div key={price._id}>
        <input
        checked={checkedPrice === price.array}       
        onChange={e => onFilters(e.taget.value)}
        type="radio"
        id={price._id}
        value={price._id}
        />
     {" "}
     <label>{price.name}</label>
    
   </div>
    ))}
  </div>
 )
}

export default RadioBox