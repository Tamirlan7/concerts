import React from 'react'
import cl from './Select.module.css'
import { ReactComponent as SelectArrowIcon } from '../../assets/select-arrow.svg'
import { IOption } from '../../types'
import { useOutsideClick } from '../../hooks/useOutsideClick'

interface SelectProps {
    value: string
    defaultValue: string
    options: IOption[]
    onChange: (val: string) => void
}

const Select: React.FC<SelectProps> = ({ value, options, onChange, defaultValue }) => {

    const [isActive, setIsActive] = React.useState<boolean>(false)

    /* 
        || REFS ||
    */

    const optionsRef = React.useRef<HTMLUListElement>(null)
    const selectRef = React.useRef<HTMLDivElement>(null)
    useOutsideClick(optionsRef, disactiveSelect, selectRef)

    /* 
        || FUNCTIONS ||
    */

    function changeValue (val: string) {
        onChange(val)
    }

    function toggleActive () {
        if(isActive)
            setIsActive(false)

        else setIsActive(true)
    }

    function disactiveSelect () {
        setIsActive(false)
    }

    return (
        <div ref={selectRef} className={cl['select']} onClick={toggleActive}>
            {value ? value : defaultValue} 
            <SelectArrowIcon />
            {isActive && <ul ref={optionsRef} className={cl['options']}>
                {options.map((option) => (
                    <li onClick={() => changeValue(option.text)} className={cl['option']} key={option.id}>{option.text}</li>
                ))}
            </ul>}
        </div>
    )
}

export default Select
