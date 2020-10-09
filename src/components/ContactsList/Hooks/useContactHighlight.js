import { useCallback, useContext, useEffect } from 'react'

import HighlightedContactContext from '../../Contexts/HighlightedContact'

const useContactHighlight = () => {
  const { highlightedContact, setHighlightedContact } = useContext(
    HighlightedContactContext
  )

  const keydownHandler = useCallback(
    ({ key }) => {
      if (key === 'Backspace') {
        setHighlightedContact(highlightedContact.slice(0, -1))
        return
      }

      if (/^\w{1}$/.test(key)) {
        setHighlightedContact(highlightedContact + key.toLowerCase())
        return
      }
    },
    [highlightedContact, setHighlightedContact]
  )

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [keydownHandler])
}

export default useContactHighlight
