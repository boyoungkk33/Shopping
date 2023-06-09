import React from 'react'

const SearchInput = ({onSearch, saearchTerm}) => {
  return (
    <input
    className='p-2 border border-gray-300 rounded-md'
    type='text'
    placeholder='검색하세요'
    onChange={onSearch}
    value={saearchTerm}
    />
  )
}

export default SearchInput