import React from 'react'

export function useOutsideClick
<T>(
    ref: React.RefObject<HTMLElement>, 
    callback: () => T,
    additionalElement?: React.RefObject<HTMLElement>
) {

/* 
    if additional element is passed the clicks on it does not invoke callback (one of the parameters) 
    ref is required, clicks on it does not invoke callback
    callback is invoked whenever it clicks out of ref element or addditional elements(if it's passed) 
*/

    React.useEffect(() => {

        function handleClickOutside(event: Event ) {
            const target = event.target as HTMLElement
  
          // false means not to invoke callback
  
            // if
            return additionalElement && target.isEqualNode(additionalElement.current) || additionalElement?.current?.contains(target)
            ? false
  
            // else if
  
            : ref && ref.current && !ref.current.contains(event.target as typeof ref.current) 
            ? callback()
  
            // else
            : false

          } 
        
        document.addEventListener('mousedown', handleClickOutside) 

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, additionalElement, callback])

}
