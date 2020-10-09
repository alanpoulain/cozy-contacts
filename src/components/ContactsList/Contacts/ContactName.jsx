import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import HighlightedContactContext from '../../Contexts/HighlightedContact'
import useQueryHighlightText from '../Hooks/useQueryHighlightText'

const ContactName = ({ displayName, familyName }) => {
  const { highlightedContact } = useContext(HighlightedContactContext)

  const namesToDisplay = (displayName && displayName.split(' ')) || []

  const highlightedFamilyName = useQueryHighlightText(
    familyName,
    highlightedContact
  )

  return (
    <div className="u-ellipsis u-ml-1">
      {namesToDisplay.map((name, key) => (
        <span
          key={`display-${key}`}
          className={cx({ 'u-fw-bold': name === familyName })}
        >
          {name === familyName ? highlightedFamilyName : name}
          &nbsp;
        </span>
      ))}
    </div>
  )
}

ContactName.propTypes = {
  displayName: PropTypes.string,
  familyName: PropTypes.string
}
ContactName.defaultProps = {
  displayName: ''
}

export default ContactName
