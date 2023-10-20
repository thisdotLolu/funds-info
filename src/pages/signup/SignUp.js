import React, { useState } from 'react'
import styles from './SignUp.module.css'

const SignUp = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[displayName,setDisplayName] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(email,password,displayName)
    }
    
  return(
    <form
    onSubmit={handleSubmit}
    className={styles['login-form']}>
        <h2>SignUp</h2>
        <label>
        <span>email:</span>
        <input
        type='email'
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        />
        </label>
        
        <label>
            <span>password:</span>
            <input
            type='password'
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            />
        </label>
        <label>
            <span>display name:</span>
            <input
            type='password'
            onChange={(e)=>setDisplayName(e.target.value)}
            value={displayName}
            />
        </label>
        <button className='btn'>Sign Up </button>
    </form>
  )
}

export default SignUp