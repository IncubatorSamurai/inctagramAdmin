import { useState } from 'react'

export const useSearch = (defaultValue = '') => {
  const [searchTerm, setSearchTerm] = useState(defaultValue)
  return { searchTerm, setSearchTerm }
}
