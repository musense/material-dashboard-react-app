import { useEffect } from 'react'

export default function usePressEnterEventHandler(targetRef, callback) {
  function keyDownEventHandler(e) {
    const keyName = e.key;
    if (keyName === 'Enter') {
      e.target.submit()
      callback && callback()
    }
  }
  useEffect(() => {
    if (targetRef.current === null) {
      targetRef.current.addEventListener('keydown', keyDownEventHandler)
    }

    const ref = targetRef.current
    return () => {
      ref.removeEventListener('keydown', keyDownEventHandler)
    }
  }, [targetRef])
}
