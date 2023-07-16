import React from 'react'
import styles from './Button.module.scss'

interface IButton {
    outline?: boolean
    outlineBlack?: boolean
    white?: boolean
    red?: boolean
    green?: boolean
    rounded?: boolean
    faded?: boolean
    disabled?: boolean
    children: React.ReactNode
    callback?: () => void
}

export const Button = ({white = false, red=false, green=false, rounded=false,  outline = false, outlineBlack=false, disabled=false, faded, children, callback}: IButton) => {

    const className = `
        ${styles.Button} ${white ? styles.ButtonWhite: ''}
        ${outline ? styles.ButtonOutline : ''}
        ${outlineBlack ? styles.ButtonOutlineBlack : ''}
        ${red ? styles.ButtonRed: ''}
        ${green ? styles.ButtonGreen: ''}
        ${rounded ? styles.ButtonRounded: ''}
        ${disabled ? styles.ButtonDisabled: ''}
        ${faded ? styles.ButtonFaded: ''}
    `

    return disabled ? 
        <button disabled={disabled} className={className} >{children}</button> : 
        <button onClick={callback} className={className} >{children}</button>
}
