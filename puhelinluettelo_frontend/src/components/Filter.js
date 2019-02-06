import React from 'react'

const Filter = ({filter, filterChange}) => (
  <div>
    rajaa näytettäviä 
    <input
      value={filter}
      onChange={filterChange}
    />
  </div>
)

export default Filter