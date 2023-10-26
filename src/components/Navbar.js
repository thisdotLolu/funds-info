import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

import React from 'react'
import { useLogout } from '../hooks/useLogout'

function Navbar() {
    const {logout,isPending,error} = useLogout()
  return (
    <div className={styles.navbar}>
        <ul>
            <li className={styles.title}>Funds Info</li>

            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>

            <li>
                <button className='btn' onClick={logout}>Logout</button>
            </li>
        </ul>
    </div>
  )
}

export default Navbar;