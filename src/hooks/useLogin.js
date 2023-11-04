import { useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { useEffect } from "react"

export const useLogin = () =>{
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const login = async (email,password)=>{
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email,password)
            dispatch({type:"LOGIN", payload:res.user})

            if(!isCancelled){
            setIsPending(false)
            setError(null)
            }
        } catch (error) {
            if(!isCancelled){
            console.log(error)
            setError(error.message)
            setIsPending(false)
            }
        }
    }

    useEffect(()=>{
        return () => setIsCancelled(true)
    },[])

    return {login,error, isPending}
}


