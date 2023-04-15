import React, { forwardRef } from 'react'
import cl from './Input.module.css'


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    isInvalid: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({label, isInvalid, ...props}, ref) => {

    return (
        <div className={cl['input-block']}>
            <input
                {...props}
                ref={ref} 
                type={props.type ? props.type : 'text'}
                className={isInvalid ? `${cl['input']} ${cl['invalid']}` : cl['input']}
                placeholder=' ' 
            />
            <label className={cl['label']}><span className={cl['span']}>{label}</span></label>
        </div>
    )
})

export default Input
