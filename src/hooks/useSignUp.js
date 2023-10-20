import React from 'react'
import { useState } from 'react'
import { projectAuth } from '../firebase/config'


const UseSignUp = () => {
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(null)

    const signup = async (email,password,displayName) =>{
        setError(null)
        setIsPending(true)

        try{
            const response  = await projectAuth.createUserWithEmailAndPassword(email,password)
            console.log(response.user)

            if(!response){
                throw new Error('Could not complete sign up')
            }
            await response.user.updateProfile({displayName})
            setIsPending(false)
            setError(null)
        }
        catch(err){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { error, isPending , signup}
}

export default UseSignUp