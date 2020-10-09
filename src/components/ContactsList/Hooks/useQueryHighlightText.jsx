import React, { useMemo } from 'react'

// adapted from cozy-bar
// @TODO share this function
export const normalizeString = str =>
  str
    .toString()
    .toLowerCase()
    .replace(/\//g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export const highlightQueryTerm = (text, query) => {
  if (!text || !query) {
    return text
  }

  const normalizedQuery = normalizeString(query)
  const normalizedText = normalizeString(text)

  if (normalizedText.indexOf(normalizedQuery) !== 0) {
    return text
  }

  const to = normalizedQuery.length

  return [<b key={0}>{text.slice(0, to)}</b>, text.slice(to)]
}

const useQueryHighlightText = (text, query) => {
  return useMemo(() => highlightQueryTerm(text, query), [text, query])
}

export default useQueryHighlightText
