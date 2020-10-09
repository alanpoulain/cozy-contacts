import React, { createContext, useState } from 'react'

const HighlightedContactContext = createContext()

const HighlightedContactProvider = ({ children }) => {
  const [highlightedContact, setHighlightedContact] = useState('')

  const contextValue = {
    highlightedContact,
    setHighlightedContact
  }

  return (
    <HighlightedContactContext.Provider value={contextValue}>
      {children}
    </HighlightedContactContext.Provider>
  )
}

export default HighlightedContactContext

export { HighlightedContactProvider }
