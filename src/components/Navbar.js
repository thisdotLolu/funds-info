import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

import React from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {
    const {logout,isPending,error} = useLogout()
    const {user} = useAuthContext();

  return (
    <div className={styles.navbar}>
        <ul>
            <li className={styles.title}>Funds Info</li>

            {!user && (
              <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
              </>
            )}
            
            {
              user && (
                <>
                <li>hello, {user?.displayName}</li>
                <li>
                <button className='btn' onClick={logout}>Logout</button>
                </li>
                </>
              )
            }
            
        </ul>
    </div>
  )
}

export default Navbar;