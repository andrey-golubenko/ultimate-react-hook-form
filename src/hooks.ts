import { useEffect, useRef } from 'react'

const useCombinedRefs = (
  innerRef: React.MutableRefObject<HTMLElement | undefined>,
  forwardedRef: React.ForwardedRef<unknown>
) => {
  const targetRef = useRef()

  useEffect(() => {
    ;[innerRef, forwardedRef].forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current || null)
      } else {
        // eslint-disable-next-line no-param-reassign
        ref.current = targetRef.current || null
      }
    })
  }, [innerRef, forwardedRef])

  return targetRef
}

export default useCombinedRefs
