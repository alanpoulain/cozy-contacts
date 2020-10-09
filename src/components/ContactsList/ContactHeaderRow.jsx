import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import HighlightedContactContext from '../Contexts/HighlightedContact'

const ContactHeaderRow = ({ header }) => {
  const { highlightedContact } = useContext(HighlightedContactContext)
  const dividerRef = useRef(null)

  useEffect(() => {
    if (
      dividerRef &&
      highlightedContact.length === 1 &&
      highlightedContact.slice(0, 1) === header
    ) {
      // go as high as posible to make sure the fixed divider doesn't hide the first contact row
      dividerRef.current.scrollIntoView(false)
      dividerRef.current.scrollIntoView()
    }
  }, [highlightedContact, header])

  return (
    <div className="divider" ref={dividerRef}>
      {highlightedContact.length > 0 &&
      highlightedContact.slice(0, 1) === header ? (
        <b>{highlightedContact}</b>
      ) : (
        header
      )}
    </div>
  )
}

ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired
}
export default ContactHeaderRow
