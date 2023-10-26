import React from 'react'
import { useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useEffect } from 'react'


const useSignUp = () => {
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(null)
    const {dispatch} = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

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

            dispatch({type:'LOGIN', payload:response.user})
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
        catch(err){
            if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }
    }

    useEffect(()=>{
        return () => setIsCancelled(true)
    },[])

    return { error, isPending , signup}
}

export default useSignUp