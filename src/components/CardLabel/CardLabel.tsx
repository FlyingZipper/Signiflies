import React from 'react'
import styles from './CardLabel.module.scss'

export const CardLabel = () => {
  return (
    <div className={styles.Layout} >
        <p>Opponent</p>
        <p>Game Date</p>
        <p>Location</p>
        <p>Players Count</p>
        <p>Opt in</p>
    </div>
  )
}
