import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

import React from 'react'

function Navbar() {
  return (
    <div className={styles.navbar}>
        <ul>
            <li className={styles.title}>Funds Info</li>

            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
        </ul>
    </div>
  )
}

export default Navbar