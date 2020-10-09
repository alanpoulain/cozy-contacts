import renderer from 'react-test-renderer'
import { renderHook } from '@testing-library/react-hooks'

import useQueryHighlightText from './useQueryHighlightText'

describe('useQueryHighlightText', () => {
  it('should not highlight a query if not found in the text', () => {
    const { result } = renderHook(() =>
      useQueryHighlightText('nice view', 'tree')
    )
    expect(result.current).toEqual('nice view')
  })

  it('should highlight a query if found in the text', () => {
    const { result } = renderHook(() =>
      useQueryHighlightText('nice view', 'nice')
    )
    expect(renderer.create(result.current).toJSON()).toMatchInlineSnapshot(`
      Array [
        <b>
          nice
        </b>,
        " view",
      ]
    `)
  })

  it('should compare normalized query and text', () => {
    const { result } = renderHook(() =>
      useQueryHighlightText('nïce view', 'nicé')
    )
    expect(renderer.create(result.current).toJSON()).toMatchInlineSnapshot(`
      Array [
        <b>
          nïce
        </b>,
        " view",
      ]
  `)
  })
})
